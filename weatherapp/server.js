const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.city;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=city&appid=89f63ed839df591c43a208b4bb3bdb08";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const wd = JSON.parse(data);

      const temp = wd.main.temp;
      res.write("THE CITY OF " + temp + "");
      res.send();
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("server started");
});
