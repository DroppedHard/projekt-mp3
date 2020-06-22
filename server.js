var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var Datastore = require("nedb");
var db = require(__dirname + "/static/dbMethods.js")
var formidable = require("formidable")
var coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
let licznik = 0

function servResponse(req, res) {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var obj = qs.parse(allData)
        fs.readdir(__dirname + "/static/mp3", function (err, files) {
            if (err) {
                return console.log(err);
            }
            obj.albumy = files
            if (obj.album == "")
                obj.album = files[0]
            fs.readdir(__dirname + "/static/mp3/" + obj.album, function (err, files2) {
                if (err) {
                    return console.log(err);
                }
                obj.files = []
                files2.forEach(el => {
                    if (el.includes(".mp3")) {
                        let stats = fs.statSync(__dirname + "/static/mp3/" + obj.album + "/" + el);
                        let dane = {
                            size: stats.size,
                            name: el
                        }
                        obj.files.push(dane)
                    }
                });
                obj.imgSrc = ""
                files2.forEach(el => {
                    if (el.includes(".jpg")) {
                        obj.imgSrc = el
                    }
                });
                res.end(JSON.stringify(obj))
            })
        });
    })
}
function servResponsePlaylist(req, res) {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var obj = qs.parse(allData)
        let ok = db.lenDB(coll1).then((data) => {
            obj.kol = data;
            coll1.find({}, function (err, docs) {
                obj.kol = docs.length
            });
            if (obj.album != "") {
                coll1.insert(obj, function (err, newDoc) {
                });
            }
            coll1.find({}, function (err, docs) {
                res.end(JSON.stringify(docs))
            });
        })
    })
}
function servUpload(req, res) {
    var form = new formidable.IncomingForm();
    var dir = './static/mp3/uploaded';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    form.uploadDir = "static/mp3/uploaded"  // katalog na zuploadowane pliki
    form.keepExtensions = true
    const promise1 = new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            newFileName = files.files.name
            oldFileName = files.files.path.split("\\")[3]
            let obj = {
                size: files.files.size,
                name: newFileName
            }
            res.end(JSON.stringify(obj))
            if (err) reject(err)
            resolve("zapisane")
        });
    })
    const a = promise1.then((data) => {
        console.log(data)
        if (!fs.existsSync(__dirname + "/static/mp3/uploaded/" + newFileName)) {
            fs.rename(__dirname + "/static/mp3/uploaded/" + oldFileName, __dirname + "/static/mp3/uploaded/" + newFileName, function (err) {
                if (err) console.log(err)
            });
        } else {
            console.log("ten plik już istnieje")
            fs.rename(__dirname + "/static/mp3/uploaded/" + oldFileName, __dirname + "/static/mp3/uploaded/" + "[" + licznik + "]" + newFileName, function (err) {
                if (err) console.log(err)
            });
            licznik++
        }
    })
}
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/admin") {
                fs.readFile("static/admin.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".js")) {
                fs.readFile("static/" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".jpg")) {
                fs.readFile("static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".png")) {
                fs.readFile("static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.indexOf(".mp3") != -1) {
                fs.readFile("static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "audio/mpeg" });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            // przy starcie, na żądanie klienta, zwróć JSON-a z nazwami katalogów zczytane z serwera
            if (req.url == "/postUtwory") {
                servResponse(req, res);
            } else if (req.url == "/postPlaylista") {
                servResponsePlaylist(req, res);
            } else if (req.url == "/upload") {
                servUpload(req, res);
            }
            break;
        default: break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
