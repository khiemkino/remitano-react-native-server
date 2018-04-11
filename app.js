const express = require('express')
const upload = require('express-fileupload')
var path = require('path')

const app = express()

var uploadDir = path.join(__dirname, '/public')

var port = process.env.PORT || 3000
app.set('port', port)
app.use(upload())
app.use(express.static(uploadDir))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.')

    let uploadFile = req.files.uploadFile
    let fileName = req.files.uploadFile.name

    uploadFile.mv(path.join(uploadDir, fileName), function (err) {
        if (err)
            return res.status(500).send(err)

        res.send(`<a target="_blank" href="/${fileName}">${fileName}</a>`)
    })
})

var server = require('http').Server(app)

server.listen(port, () => {
    console.log('App is running at port' + port)
})

