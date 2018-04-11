const express = require('express');
// const multer = require('multer');
var upload = require('express-fileupload');
var path = require('path')
// const upload = multer({
//     dest: 'public/'
// });

const app = express();

app.use(upload());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
                // res.sendfile(path.resolve(uploadpath));
                res.send('<a style="font-size:30px;" href="http://file:///' + uploadpath + '">' + uploadpath + '</a>')
            }
        });
    }
    else {
        res.send("No File selected !");
        res.end();
    };
});

app.listen(process.env.PORT || 3000);