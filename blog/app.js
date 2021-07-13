const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DBschema = new mongoose.Schema({
  image:{
    type:String
  }
});

const imagedata = mongoose.model("imagedata", DBschema);

const home = "This is home page from app.js";
const about = "This is about page from app.js";
const contact = "This is contact page from app.js";
const ho = "HOME";
const a = "ABOUT";
const c = "CONTACT";
let data = [];

const app = express();
app.use(
  bodyparser.urlencoded({ extended: true }, { useUnifiedTopology: true })
);



app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));







app.get("/", function (req, res) {

  res.render("home", { homeejs: home, pageejs: ho, dataejs: data });
});



app.post("/",function(req,res){
  let newimage= new imagedata({
      image: req.body.filename,
    })
    newimage.save(function(err){
      if(err){
        console.log(err)
      }else{
        console.log("added")
      }
    })


})

app.get("/about.ejs", function (req, res) {
  b = 0;

  res.render("about", { aboutejs: about, pageejs: a });
});

app.get("/contact.ejs", function (req, res) {

  res.render("contact", { contactejs: contact, pageejs: c });
});

app.get("/posts/:name", function (req, res) {
  let f = 0;
  for (var i = 0; i < data.length; i++) {
    if (_.lowerCase(data[i].title) === _.lowerCase(req.params.name)) {
      f = 1;
      break;
    }
  }
  if (f === 1) {
    res.render("post", {
      title: data[i].title,
      info: data[i].content,
      page: req.params.name,
    });
  } else if (f === 0) {
    res.render("post", {
      title: "oops!",
      info: "No such post is found,try again",
    });
  }
});

app.post("/compose.ejs", function (req, res) {
  const post = {
    title: req.body.posttitle,
    content: req.body.postbody,
  };
  data.push(post);
  res.redirect("/");
  b = 1;
});

app.get("/compose.ejs", function (req, res) {
  res.render("compose");
});

app.listen(3000, function () {
  console.log("SERVER STARTED");
});
