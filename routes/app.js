const express=require("express")
const bodyparser=require("body-parser")
const ejs=require("ejs")
const path=require("path")
const session=require("express-session")
const app=express()
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));
app.use(session({
    secret:"dushu270",
    resave:false,
    saveUninitialized: false
}))
const userRoute=require("./route/user")
const dataRoute=require("./route/data")

app.use("/",userRoute)
app.use("/",dataRoute)



app.listen("3000", function() {
    console.log("server started")
})