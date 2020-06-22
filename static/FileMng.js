class FileMng {
    constructor() {
        this.pobieranie()
    }
    pobieranie() {

        $("html").on("dragover", function (e) {
            e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia
            e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia
        });
        $("#dane").on("dragover", function (e) {
            $('#upload-text').html("najedź na pole aby przesłać pliki na serwer")
        });
        $("html").on("drop", (e) => {
            $('#upload-text').html("upload")
            e.preventDefault();
            e.stopPropagation();
        });
        $('#upload').on('dragover', (e) => {
            $('#upload-text').html("upuść tutaj aby przesłać pliki na serwer")
        });
        $('#upload').on('drop', (e) => {
            $('#upload-text').html("upload")
            e.preventDefault();
            e.stopPropagation();
            var files = e.originalEvent.dataTransfer.files;
            for (let i = 0; i < files.length; i++) {
                this.upload(files[i])
            }
            $("#dane").html("")
            let rekord = $("<h4>")
            let name = $("<span>").html("Nazwa utworu").attr("class", "upload-name")
            let size = $("<span>").html("Rozmiar pliku").attr("class", "upload-size")
            rekord.append(name, size)
            $("#dane").append(rekord)
        });
    }

    upload(plik, nazwa) {
        var fd = new FormData();
        fd.append('files', plik);
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: fd,
            contentType: false, // ajax nie określa typu przesyłanych danych
            processData: false, // ajax w żaden sposób nie przetwarza danych
            success: function (response) {
                let dane = JSON.parse(response)
                let rekord = $("<h4>")
                let name = $("<span>").html(dane.name).attr("class", "upload-name")
                let size = $("<span>").html(dane.size).attr("class", "upload-size")
                rekord.append(name, size)
                $("#dane").append(rekord)
            }
        })
    }
}
