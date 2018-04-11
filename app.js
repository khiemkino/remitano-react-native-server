const express = require('express');
// const multer = require('multer');
var upload = require('express-fileupload');
var path = require('path')
// const upload = multer({
//     dest: 'public/'
// });

const app = express();
var uploadpathServer

app.use(upload());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
    res.sendfile(path.resolve(uploadpathServer));
});

app.post('/', function (req, res) {
    console.log(req.files);
    if (req.files.input_upload) {
        var file = req.files.input_upload
        var name = file.name

        var uploadpath = __dirname + '/public/' + name;
        file.mv(uploadpath, function (err) {
            if (err) {
                console.log("File Upload Failed", name, err);
                res.send("Error Occured!")
            }
            else {
                console.log(uploadpath)
                uploadpathServer = uploadpath
                res.send('<form method="post" action="/upload">' +
                    '<button style="padding: 10px 40px;background-color: #8B4AA8;color: white;font-size: 20px;border-radius: 15px;margin-top: 50px;" type="submit">' + 'Open your file : ' + name + '</button>' +
                    '</form>')
            }
        });
    }
    else {
        res.send("No File selected !");
        res.end();
    };
});

app.listen(process.env.PORT || 3000);