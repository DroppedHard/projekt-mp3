
var obj = {


  lenDB: (coll1) => {
    const find = new Promise((resolve, reject) => {
      coll1.find({}, function (err, docs) {
        if (err) reject(err)
        resolve(docs)
      });
    })
    const a = find
      .then((data) => {
        return data.length;
      })
    return a;
  },
  add: function (coll1, ob) {
    coll1.insert(ob, function (err, newDoc) {
    });
  },
  getDocs: function (coll1) {
    coll1.find({}, function (err, docs) {
      return docs
    });
  }
}


module.exports = obj