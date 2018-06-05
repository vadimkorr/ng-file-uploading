var express = require("express");
var app = express();

var config = require("./consts/config");
var handler = require("./handler");

app.use(express.static(config.UPLOADS_PATH));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.get("/hi", handler.getHi);
app.post("/upload", handler.upload);
app.get("/form", handler.getForm);
app.post("/form", handler.postForm);

app.listen(config.PORT, function() {
  console.log(`Server listening on port ${config.PORT}`);
});
