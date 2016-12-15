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

var server = http.createServer(app)
var io = require('socket.io')(server)
io.on('connection', function (socket) {
  refreshFiles()
});

app.get('/api/refreshFiles', function(req, res){
  refreshFiles()
  res.json({status : 'ok', msg: 'ok', date: new Date()})
})

/*
* Upload entry point
*/
app.post('/api/upload', upload.single('avatar'), function (req, res, next) {
  //console.log("Hey there avatar, file was uploaded")
  refreshFiles()
  res.json({status:"it works"})
})

app.get('/api/delete/:path', function (req, res, next) {
  let filePath = './uploads/'+req.params.path
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath,function(err){
      if(err){
        res.json({status:"error"})
      } else {
        res.json({status:"it works"})
      }
      refreshFiles()
    })
  } else {
    res.json({status:"error"})
  }
  refreshFiles()
})

app.get('/api/get/:path', function (req, res, next) {
  let filePath = './uploads/'+req.params.path
  if (fs.existsSync(filePath)) {
    res.download(filePath)
  } else {
    res.json({status:"it works"})
  }
  refreshFiles()
})

server.listen(3000, function () {
  console.log('Listening on port 3000!')
})

function refreshFiles(){
  const testFolder = './uploads/';
  fs.readdir(testFolder, (err, files) => {
    io.emit('files', files.filter(x => x !== '.gitkeep').map(file => {
      return { path: file, date: new Date() }
    }))
  })
}

