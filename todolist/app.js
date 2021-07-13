const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path=require("path")
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const todoschema = new mongoose.Schema({
  name: String,
});
const todolist = mongoose.model("todolist", todoschema);
const breakfast = new todolist({
  name: "BREAK FAST",
});

const lunch = new todolist({
  name: "LUNCH",
});









const defaultitems = [breakfast, lunch];


 
let msg;
let flag = 0;

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var day = new Date();
  var print = day.toLocaleDateString("en-US", options);

  todolist.find({}, function (err, found) {
    if (err) {
      console.log(err);
    } else if (found.length === 0) {
      todolist.insertMany(defaultitems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("DATA INSERTED IN DB");
        }
      });
      res.redirect("/");
    } else {
      if (flag === 1) {
        res.render("list", { Today: print, newitems: found, msg: msg ,image:""});
        flag = 0;
      } else if (flag === 0) {
        msg = "";
        res.render("list", { Today: print, newitems: found, msg: msg ,image:""});
      }
    }
  });
});










app.post("/",function (req, res) {
  let data = req.body.newitem;
  if (data !== "") {
    let item = new todolist({
      name: req.body.newitem,
    });
    item.save();
  }

  let delitem = req.body.deleteitem;
  if (delitem !== "") {
    todolist.findOne({ name: delitem }, function (err, i) {
      if (i !== null) {
        if (err) {
          console.log(err);
        } else if (i.name === delitem) {
          todolist.deleteOne({ name: delitem }, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
            }
          });
        }
      } else {
        msg = "NOT FOUND";
        flag = 1;
      }
    });
  }
       


  res.redirect("/");
});







app.listen(3000, function (req, res) {
  console.log("SERVER STARTED");
});
