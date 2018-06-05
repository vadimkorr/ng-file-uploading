var express = require("express");
var crypto = require("crypto");
var multer = require("multer");
var path = require("path");
var mime = require("mime");
var fs = require("fs");
var request = require("request");
var app = express();

var ss = require("socket.io-stream");
var server = require("http").Server(app);
var io = require("socket.io")(server);

var sck;
io.on("connection", socket => {
  sck = socket;
  console.log("new connection made");

  socket.on("event1", data => {
    console.log("socker event", data.msg);
  });
});

const PORT = 3000;
const UPLOADS_PATH = path.join(__dirname, "uploads");
const DOWNLOADS_PATH = path.join(__dirname, "downloads");
app.use(express.static(UPLOADS_PATH));
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/hi", (req, res) => {
  res.send({ data: "hi" });
});

app.get("/upload", (req, res) => {});

app.post("/upload", (req, res, next) => {
  var algorithm = "aes-256-ctr";
  var password = "d6F3Efeq";

  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    // "Content-Type": req.headers["content-type"],
    Connection: "Transfer-Encoding",
    "Transfer-Encoding": "chunked"
  });
  req.on("data", chunk => {
    res.write(chunk);
    res.flushHeaders();
  });
  req.on("end", function() {
    res.end();
  });

  // req
  //.pipe(w)
  // req.pipe(res);
});

app.post("/upload2", (req, res, next) => {
  var stream = ss.createStream();
  stream.on("end", function() {
    console.log("stream file sent");
  });
  ss(socket).emit("sending", stream);
  req.pipe(stream);
  // req.on("data", ch => {});

  req.on("end", () => {
    res.end();
  });
});

// app.post("/upload", upload.array("files"), (req, res) => {
//   console.log("files", req.files);
// });

app.get("/download", (req, res) => {
  var filePath = path.join(DOWNLOADS_PATH, "book.pdf");

  var filename = path.basename(filePath);
  var mimetype = mime.lookup(filePath);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  res.download(filePath);
});

server.listen(PORT, "192.168.50.49", function() {
  console.log(`Server listening on port ${PORT}`);
});

// app.listen(PORT, function() {
//   console.log(`Server listening on port ${PORT}`);
// });
