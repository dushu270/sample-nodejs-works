const express=require("express")
const router=express.Router()

router.post("/data",function(req,res){
  if(!req.session.a){
    req.session.a=0
  }
  req.session.a+=Number(req.body.value)
    res.render("data",{val:req.session.a})
})
  

router.get("/maya",function(req,res){
  res.render("data",{val:req.session.a+1})

})

module.exports =router