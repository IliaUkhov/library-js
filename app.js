const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const fs = require("fs");
fs.readFile("books.json", (err, data) => {
  if (err) throw err;
  global.books = JSON.parse(data);
  var i = 0;
  for (book of books) {
    book.id = i++;
  }
});

app.use("/resources", express.static(__dirname + "/resources"));
app.use(bodyParser.json());

app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.set("views", "./views");

const routes = require("./routes");

app.use("/", routes);
app.listen(8000);
