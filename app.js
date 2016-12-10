var express = require('express')
var multer  = require('multer')

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

app.post('/api/file', upload.single('avatar'), function (req, res, next) {
  console.log("Hey there avatar, file was uploaded")
  res.json({status:"it works"})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})