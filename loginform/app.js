const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/sampleUserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", UserSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("data");
});

app.get("/login.ejs", function (req, res) {
  res.render("login");
});

app.get("/register.ejs", function (req, res) {
  res.render("register");
});

app.post("/register.ejs", function (req, res) {
  User.register(
    { username: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register.ejs");
      } else {
        passport.authenticate("local");
        res.redirect("/");
      }
    }
  );
});

app.listen(3000, function (req, res) {
  console.log("SERVER STARTED");
});
