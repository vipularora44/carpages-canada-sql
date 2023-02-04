const express=require('express');
const bodyParser=require("body-parser");
const app=express();
app.use(express.static('uploads'));
const cors =require('cors');
/*const multer=require('multer');
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, '../src/images/dealer-images')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + uniqueSuffix +'.jpg')
   }
 })

const upload= multer({storage:storage});*/
const cookieparser=require('cookie-parser');
const session =require('express-session');

const mail=require('nodemailer');
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const saltrounds=10;
const { json } = require('body-parser');
const mysql = require("mysql");
const db = mysql.createPool({
   host: "localhost",
   user:  "root",
   password: "vipularora@180390",
   port: 3306,
   database: "carpages_canada",
   
});
app.use(function (request, res, next) {
  res.header("Access-Control-Allow-Origin",);

  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
 
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
   origin:["http://localhost:3000"],
   methods:["POST","GET"],
   withCredentials:false,
}));
app.use(express.json());
app.use(cookieparser());
app.use(session({
path:"/",
key:"HELLO_USER",
secret:"chalchaddhorsuna",
resave:false,
saveUninitialized:false,
cookie:{
  
  maxAge:7200000,
}, 

}));
const FileUpload=require("express-fileupload");
const path=require("path");

app.use(require('express-useragent').express())
app.use(FileUpload({
   useTempFiles:true,
   tempFileDir:'../src/images/dealer-images'
}));


//Delete Cookies




//Api for users Data
const users=require('./routes/user');
app.use("/users",users);

//Api for categories Data
const categories=require('./routes/categories');
app.use("/categories",categories);

//Api for listings Data
const listings=require('./routes/listings');
app.use("/listings",listings);

const watchlist=require('./routes/user_watchlist');
app.use("/watchlist",watchlist);




app.listen(3001,() => {
  console.log("running on port 3001");
  });
 

