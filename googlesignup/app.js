require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();
let pic

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
    secret:"our little secret",
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  mongoose.connect("mongodb+srv://dushu270:iasnarik456@publicblog.o0a2h.mongodb.net/userDB", {useNewUrlParser: true,useUnifiedTopology: true });
  mongoose.set("useCreateIndex", true);
  
  const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
   // googleId: String,
  });

  userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: "1061631895594-g14qu2tg70mr9dds5a15uf50ptsrggib.apps.googleusercontent.com",
    clientSecret: "Jnpa3D8Fqmzd1Ac46qBuQx_Q",
    callbackURL: "https://googlesignup.herokuapp.com/auth/google/result",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(typeof(profile));
    pic=JSON.parse(JSON.stringify(profile))
console.log(pic)
    console.log(pic.photos[0].value)


    
    User.findOrCreate({username:profile.emails[0].value,googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
    res.render("index");
  });
  
  app.get("/auth/google",
    passport.authenticate('google', { scope: ["profile",'email'] })
  );
  
  app.get("/auth/google/result",
    passport.authenticate('google', { failureRedirect: "/" }),
    function(req, res) {
      // Successful authentication, redirect to secrets.
      res.redirect("/result");
    });

    app.get("/result", function(req, res){
        res.render("result",{image:pic.photos[0].value});
      });


      let port = process.env.PORT;
      if (port == null || port == "") {
        port = 3000;
      }
      
      app.listen(port, function (req, res) {
        console.log("SERVER STARTED");
      });
      