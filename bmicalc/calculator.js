const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var w = Number(req.body.weight);
  var h = Number(req.body.height);
  var r = w / (h * h);
  res.write("<p> the bmi result is: " + r + "</p>");
  if (r <= 25) {
    res.write("over weight");
  } else {
    res.write("[erfect");
  }
  res.send();
});

app.get("/add.html", function (req, res) {
  res.sendFile(__dirname + "/add.html");
});

app.post("/add.html", function (req, res) {
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2;
  res.write("<p>the addition is " + result + "</p>");
  res.write("<br/>");
  res.write("second write");
  res.send();
});

app.listen(3000, function () {
  console.log("SERVER STARTED");
});
