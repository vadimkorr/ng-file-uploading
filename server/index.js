var express = require('express');
var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/hi', (req, res) => {
  res.send({ data: 'hi' });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});