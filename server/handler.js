var multiparty = require("multiparty");
var format = require("util").format;

exports.getHi = (req, res, next) => {
  res.send({ data: "hi" });
};

exports.getForm = (req, res, next) => {
  res.send(
    '<form method="post" enctype="multipart/form-data">' +
      '<p>Title: <input type="text" name="title" /></p>' +
      '<p>Image: <input type="file" name="image" /></p>' +
      '<p><input type="submit" value="Upload" /></p>' +
      "</form>"
  );
};

exports.postForm = (req, res, next) => {
  // create a form to begin parsing
  var form = new multiparty.Form();
  var image;
  var title;

  form.on("error", next);
  form.on("close", function() {
    res.send(
      format(
        "\nuploaded %s (%d Kb) as %s",
        image.filename,
        (image.size / 1024) | 0,
        title
      )
    );
  });

  // listen on field event for title
  form.on("field", function(name, val) {
    if (name !== "title") return;
    title = val;
  });

  // listen on part event for image file
  form.on("part", function(part) {
    if (!part.filename) return;
    if (part.name !== "image") return part.resume();
    image = {};
    image.filename = part.filename;
    image.size = 0;
    part.on("data", function(buf) {
      image.size += buf.length;
    });
  });

  // parse the form
  form.parse(req);
};

exports.upload = (req, res, next) => {
  // create a form to begin parsing
  var form = new multiparty.Form();
  var file;
  var name;

  form.on("error", next);
  form.on("close", function() {
    // res.send(
    //   format(
    //     "\nuploaded %s (%d Kb) as %s",
    //     file.filename,
    //     (file.size / 1024) | 0,
    //     name
    //   )
    // );
    res.end();
  });

  // listen on field event for title
  form.on("field", (name, val) => {
    if (name !== "name") return;
    console.log("FIELD", name, val);
    name = val;
  });

  // listen on part event for image file
  form.on("part", part => {
    if (!part.filename) return;
    if (part.name !== "file") return part.resume();
    file = {};
    file.filename = part.filename;
    file.size = 0;

    // res.writeHead(200, {
    //   "Content-Type": "application/octet-stream",
    //   // "Content-Type": req.headers["content-type"],
    //   Connection: "Transfer-Encoding",
    //   "Transfer-Encoding": "chunked"
    // });

    part.on("data", buf => {
      // console.log("file name ===>", part.filename);
      // file.size += buf.length;
      res.write(buf);
      res.flushHeaders();
    });
  });

  // form.on("file", f => {
  //   console.log("FORM", f);
  // });

  // parse the form
  form.parse(req);
};
