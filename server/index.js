var express = require('express');
var multer = require('multer');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var app = express();

const PORT = 3000;
const UPLOADS_PATH = path.join(__dirname, 'uploads');
const DOWNLOADS_PATH = path.join(__dirname, 'downloads');
app.use(express.static(UPLOADS_PATH));
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/hi', (req, res) => {
  res.send({ data: 'hi' });
});

app.post('/upload', upload.array("files"), (req, res) => {
  console.log('files', req.files);
});

app.get('/download', (req, res) => {
  var filePath = path.join(DOWNLOADS_PATH, 'book.pdf');

  var filename = path.basename(filePath);
  var mimetype = mime.lookup(filePath);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  res.download(filePath);
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});