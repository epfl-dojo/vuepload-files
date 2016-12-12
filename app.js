var http = require('http')
var express = require('express')
var multer  = require('multer')
var cors = require('cors')
var fs = require('fs')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/' )
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage })

var app = express()
app.use(express.static('public'))
app.use(cors())

var fakeFiles = [
  { id:1, path: './from.server.1', date: new Date()}, 
]

var server = http.createServer(app)
var io = require('socket.io')(server)
io.on('connection', function (socket) {
  socket.emit('files', fakeFiles)
});

app.get('/api/refreshFiles', function(req, res){
  refreshFiles()
  res.json({status : 'ok', msg: 'ok', date: new Date()})
})

/*
* Upload entry point
*/
app.post('/api/file', upload.single('avatar'), function (req, res, next) {
  console.log("Hey there avatar, file was uploaded")
  res.json({status:"it works"})
})

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function refreshFiles(){
  fakeFiles.push({id: 345, path: './from.server.' + new Date().getSeconds() , date: new Date()})
  io.emit('files', fakeFiles)
}