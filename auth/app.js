
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Static folder

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});




app.post('/', (req, res) => {


  res.redirect("/data")
app.get("/data",function(req,res){
       console.log("sddfefr")
})

  let code=Math.floor((Math.random()*1000000)+1);


  const output = `
    <h3>Email verifiaction</h3>
    <ul>  
      
      <li>Email: ${req.body.email}</li>
      <li>code: ${code}</li>
    </ul>
    <h3>This is the verfication code for your account registration</h3>
  `;
  let transporter = nodemailer.createTransport({
   
    service : 'gmail',
    auth: {
        user: 'publicblog2021@gmail.com',
        pass: 'publicblog123!@#'  
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
      from: '"PUBLIB BLOG" <publicblog2021@gmail.com>', 
      to: req.body.email, 
      subject: 'PUBLIC BLOG account verification', 
      html: output 
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('send');
  });
  });

app.listen(3000, () => console.log('Server started...'));


