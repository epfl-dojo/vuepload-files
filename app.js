var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

var app = express()
app.use(express.static('static/dist'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/file', upload.single('avatar'), function (req, res, next) {
  console.log("Hey there")
  res.json({id:"test"})
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})