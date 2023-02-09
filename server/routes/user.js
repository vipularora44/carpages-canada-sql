
const express=require("express");
const path=require("path");
const crypto =require('crypto');
const mail=require('nodemailer');
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const saltrounds=10;
const sid='AC2a1865ec5bf87bd0f0d31e007fb11953';
const auth_token='10c39215c4edf82f68625a4315e9b53a';
const twilio=require('twilio');
const client = new twilio(sid,auth_token);


let userRouter =express.Router();

const db=require("../dbconn");

const { Router } = require("express");



var transporterMail = mail.createTransport({
   service:'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth:{
      user:'vipularora44@gmail.com',
      pass:'jpzdetzonwoynpgq',
   },
   tls:{
      rejectUnauthorized:false
   }
});


userRouter.route("/getUsers")
.post((req,res) =>{
   const userId=req.body.userId;
    const sqlSelect = "SELECT * FROM users WHERE user_id=?";
    db.query(sqlSelect,[userId],(err,result) =>{
      res.send(result);
    });
    });

userRouter.route("/allDealers")
.post( (req,res) =>{

        const dealer=req.body.dealer;
        console.log("dealer::"+dealer);
         const sqlSelect="SELECT * FROM users WHERE user_type = ?";
         db.query(sqlSelect,[dealer],(err,result1)=>{
            if(err)
            {
               console.log("err type:" + err);
            }
            else
            {
               res.send(result1);
              console.log();}
         });
      });

      userRouter.route("/allUsers")
.get( (req,res) =>{

        const dealer=req.body.dealer;
        console.log("dealer::"+dealer);
         const sqlSelect="SELECT * FROM users";
         db.query(sqlSelect,(err,result1)=>{
            if(err)
            {
               console.log("err type:" + err);
            }
            else
            {
               res.send(result1);
              console.log();}
         });
      });
      const verifyJWT=(req,res,next)=>{
        const token=req.headers["x-access-token"];
        if(!token)
        {
        res.send("You need to give us token,Please give us token next time.");
        }
        else{
           jwt.verify(token,"jWTSecret",(err,decoded)=>{
        
        if(err)
        {
           res.json({auth:false,message:"you failed to get authenticate:"});
        }
        else
        {
           req.user_id=decoded.id;
           next();
        }
           })
        }
        };
        
        userRouter.route("/isUserAuthenticated")
        .get(verifyJWT,(req,res)=>{

            res.json({auth:true,message:"Congrats,You are Authenticated:"});
         });

         userRouter.route("/signIn")
         .get((req,res) =>{

            console.log("REQ"+JSON.stringify(req.session.HELLO_USER));
            console.log("req.cookies"+JSON.stringify(req.session.cookie));
            if(req.session.HELLO_USER)
            {
               res.send({LoggedIn:true,user:req.session.HELLO_USER});
               console.log(JSON.stringify(req.session.HELLO_USER));
            }
            else
            {
               res.send({LoggedIn:false});
               
            }
         })
         .post((req,res) =>{
            const email=req.body.Email;
            const password=req.body.passWord;

            console.log("its working here"+email+password);
            
            const logindata= "SELECT * FROM users WHERE user_email = ?";
            db.query(logindata,[email],(err,result)=>{
               console.log("working here too");
               if(err)
               {
               console.log(err+"...");
               
               }
               
               console.log(result.length+"result..."+JSON.stringify(result));
              if(result.length>0 && result !==[])
               {
                  if(result[0].is_verified === "true")
                  {
                      console.log(result[0].is_verified+"PASSWORD:"+result[0].is_verified);
                     bcrypt.compare(password , result[0].user_password, (error,resp)=>{
                   
                     if(resp)
                     {   const id=result[0].user_id;
                         const token=jwt.sign({id},"jWTSecret",{
                           expiresIn:7200,
                         });
                         
                         req.session.HELLO_USER=result;
                         req.session.cookie.HELLO_USER=result;
                         console.log("it is Result.."+JSON.stringify(result));
                         console.log(result);
                         res.json({auth:true,token:token,result:result});
                        
                     }
                    
                     else
                     {
                        res.json({auth:false,message:"Wrong Username and Password"});
                     
                     }
                     
         
                  })
                  }
                  else if(result[0].is_verified === "false")
                  {
                     res.json({is_verified:result[0].is_verified,message:"Your Email is not verified ,verify it first"});
                  }
               
               }
               
               else {
                  res.json({auth:false,message:"User Doesn,t Exist"});
                       }
            });
         });

         userRouter.route("/logout")
         .post((req,res)=>{
            console.log("Logout Body"+JSON.stringify(req.body));
            console.log("logout Working");
             // req.session.destroy();
            
               res.clearCookie('HELLO_USER',{path:"/",domain:'carpages-canada-sql-frnt.onrender.com'});
          
        
            res.send('user logout successfully');
         });


           userRouter.route("/getDealerDetails")
           .post( (req,res) => {
  
            const userId=req.body.userId;
            
            const sqlcreateAccount = "SELECT * FROM users WHERE user_id = ?";
           
               db.query(sqlcreateAccount,[userId], (err,result) => {
                  if(err)
                  {
                     console.log(err);
                  }
                  else{
                     console.log(JSON.stringify(result));
                     res.send(result);
                  }
               });
              
            });


            userRouter.route("/forgotCredentials")
            .post( (req,res) => {
              
               var Values=[];
               var conditions=[];
             const phone_number=req.body.phone_number;
             const email=req.body.email;
             if(phone_number)
             {
               
              conditions.push("user_contactno = ?");
              Values.push(phone_number);
             }
             if(email)
             {
              
              conditions.push("user_email = ?");
              Values.push(email);
             }

            
             const sqlcreateAccount = "SELECT user_id,user_name,user_email,user_contactno FROM users WHERE "+conditions;
            
                db.query(sqlcreateAccount,Values,(err,result) => {
                   if(err)
                   {
                      console.log(err);
                   }
                   else{
                     if(result.length>0)
                     {
                        console.log("come here 1");
                        res.send(result);
                     }
                     else if(result.length === 0)
                     {
                        console.log("come here 2");
                        Values=[];
                        conditions=[];
                        if(phone_number !=="")
                        {
                         conditions.push("alternate_contact = ?");
                         Values.push(phone_number);
                        }
                        const sqlcreateAccount = "SELECT user_id,user_name,user_email,alternate_contact FROM users WHERE "+conditions;
            
                        db.query(sqlcreateAccount,Values, (err,result) => {
                           if(err)
                           {
                              console.log(err);
                           }
                           else{
                             if(result)
                             {
                                res.send(result);
                             }
                            
                             
                           }
                        });
                     }
                     
                   }
                });
               
             });


            userRouter.route("/updatePassword")
            .post((req,res)=>{
               const userId=req.body.userId;
               const user_pass=req.body.user_pass;
               
              
               const sqlUpdateCategory= "UPDATE users SET user_password = ? WHERE user_id = ?";
               bcrypt.hash(user_pass,saltrounds,(err,hash)=>{
                  if(err)
                  {
                     res.send("Error:"+err);
                  } 
                  db.query(sqlUpdateCategory,[hash,userId],(err,result)=>{
            
                     if(err)
                     {
                        console.log(err);
                     }
                     else
                     {
                        res.send(result);
                     }
                  
                     })
               });
               
            });

            
            userRouter.route("/updatetBuyFromHome")
            .post((req,res)=>{
               const userId=req.body.userId;
               const BFM=req.body.B_f_M;
               console.log("Body.."+JSON.stringify(req.body));
               const sqlUpdateCategory= "UPDATE users SET buy_from_home =? WHERE user_id = ?";
               
                  db.query(sqlUpdateCategory,[BFM,userId],(err,result)=>{
            
                     if(err)
                     {
                        console.log(err);
                     }
                     else
                     {
                        res.send(result);
                     }
                  
                     })
               });
            userRouter.route("/otpEmail")
            .post((req,res)=>{
             console.log(JSON.stringify(req.body));
               const otp=req.body.otp;
               const useremail=req.body.email;
               const fullName=req.body.fullName;
               
                  var mailOptions={
                  from:'vipularora44@gmail.com',
                  to:useremail,
                  subject:'carpgaes-canada - otp to reset Password',
                  html:`<h4>Dear Carpages User</h4>
                        
                         <p>We received a request to access your Carpages Account ${useremail} through your email address. Your Google verification code is:</p>
                         <h2>${otp}</h2>
                         <p>If you did not request this code, it is possible that someone else is trying to access the Carpages Account ${useremail}. Do not forward or give this code to anyone.
                         </p>
                        `  
                 }
  
                 transporterMail.sendMail(mailOptions,function(error,info)
                 {
                    if(error)
                    {
                        console.log(error);
                    }
                    else
                    {
                       console.log("OTP sent to your email account ");
                    }
                 });
                 
                
            });


               userRouter.route("/insertuser")
               .post((req,res)=>{
  console.log(JSON.stringify(req.body));
                  let fileName;
                  if(!req.files)
                {
                 
                   fileName="default_profile_image.jpg";
                }
                else
                {
                  fileName=Date.now()+"-"+req.files.image.name;
                  let newpath=path.join(process.cwd(),'../src/images/dealer-images',fileName);
                  req.files.image.mv(newpath);
                }
                
                 const username=req.body.username;
                 const useremail=req.body.email;
                 
                 const userpassword=req.body.password;
                 const userlotno=req.body.lotno;
                 const userstreetname=req.body.streetname;
                 const usercityname=req.body.cityname;
                 const userprovince=req.body.province;
                 const userpostalcode=req.body.postalcode;
                 const usercontact=req.body.contact;
                 const usercontact2=req.body.altcontact;
                 const usertype=req.body.usertype;
                 const buyFromHome=req.body.buyFromHome;
                 const isVerified=req.body.isVerified;
                 const user_status=req.body.user_status;
                 const emailToken=crypto.randomBytes(64).toString("hex");
                 
                 const sqlinsertModel="INSERT INTO users (user_email,user_password,user_name,user_province,user_cityname,user_lotno,user_streetname,user_postalcode,user_contactno,alternate_contact,user_image,user_type,buy_from_home,is_verified,email_token,user_status)"+ "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                 bcrypt.hash(userpassword,saltrounds,(err,hash)=>{
                  if(err)
                  {
                     res.send("Error:"+err);
                  } 
                 
                 db.query(sqlinsertModel,[useremail,hash,username,userprovince,usercityname,userlotno,userstreetname,userpostalcode,usercontact,usercontact2,fileName,usertype,buyFromHome,isVerified,emailToken,user_status], (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                  });
               });

               var mailOptions={
                from:'vipularora44@gmail.com',
                to:useremail,
                subject:'carpgaes-canada - verify your email',
                html:`<h2> ${username}! Thanks for registering on our site </h2>
                      <h4>Please verify your email to continue ....</h4>
                      <a href="http://${req.headers.host}/users/confirm_email?email=${useremail}&token=${emailToken}"> verify your email by clicking here </a>
              
                      `  
               }

               transporterMail.sendMail(mailOptions,function(error,info)
               {
                  if(error)
                  {
                      console.log(error);
                  }
                  else
                  {
                     console.log("verification email sent to your email account ");
                  }
               });
               
               });
               userRouter.route("/updatetUserStatus")
               .post((req,res) => {
             
                               const UserId=req.body.UserId;
                               const status=req.body.status;
                      
                               const sqlcreateAccount = "UPDATE users SET user_status ='"+status+"' WHERE user_id = ?";
                              
                                  db.query(sqlcreateAccount,[UserId], (err,result) => {
                                     if(err)
                                     {
                                        console.log(err);
                                     }
                                     else{
                                        res.send(result);
                                     }
                                  });
                                 
                               });
               
               userRouter.get('/confirm_email',(req,res)=>{
                  
                  
                  const token=req.query.token;
                  const email=req.query.email;
                  console.log(email+"token........"+token);
                //  res.redirect("https://www.geeksforgeeks.org/");
                  
                  const sqlcreateAccount = "SELECT email_token,is_verified FROM users WHERE user_email = ?";
           
                  db.query(sqlcreateAccount,[email], (err,result) => {
                     if(err)
                     {
                        console.log("ERROR 1"+err);
                     }
                     else{
                        console.log("1  false........");
                        console.log("Result"+JSON.stringify(result));
                        if(result[0].is_verified === "true")
                        {
                           console.log(" 2  false........");
                           res.redirect("http://carpages-canada-sql-frnt.onrender.com/signin");
                        }
                        else if(result[0].email_token === token && result[0].is_verified === "false")
                        { console.log("3   false........");
                           const sqlcreateAccount = "UPDATE users SET is_verified='true' WHERE user_email = ?";
                           
                           db.query(sqlcreateAccount,[email], (err,result) => {
                              if(err)
                              {
                                 console.log("ERROR 2"+err);
                              }
                              else{
                                 
                                 res.redirect("http://carpages-canada-sql-frnt.onrender.com/signin");
                              }
                           });
                        }
                        else if(result[0].email_token !== token)
                        {
                           const sqlcreateAccount = "UPDATE users SET is_verified='true' WHERE user_email = ?";
           
                           db.query(sqlcreateAccount,[email], (err,result) => {
                              if(err)
                              {
                                 console.log("ERROR 3"+err);
                              }
                              else{
                                 const sqlcreateAccount = "SELECT email_token,is_verified FROM users WHERE user_email = ?";
           
                                          db.query(sqlcreateAccount,[email], (err,result) => {
                                             if(err)
                                             {
                                                console.log("ERROR 4"+err);
                                             }
                                             else
                                             {
                                                if(result[0].email_token === token)
                                                {
                                                   res.redirect("http://carpages-canada-sql-frnt.onrender.com/signin");
                                                }
                                             }
                                          });
                              }
                           });
                        }
                     }
                  });

               });


               userRouter.route("/updatetuser")
               .post((req,res)=>{
                  const userId=req.body.userId;
                  const username=req.body.username;
                  const email=req.body.email;
                  const lotno=req.body.lotno;
                  const streetname=req.body.streetname;
                  const cityname=req.body.cityname;
                  const province=req.body.province;
                  const postalcode=req.body.postalcode;
                  const contact=req.body.contact;
                  const altcontact=req.body.altcontact;
                  const usertype=req.body.usertype;
                  const imageChanged=req.body.imageChanged;
                  console.log(JSON.stringify(req.files)+"BODY.."+JSON.stringify(req.body));
                  if(imageChanged === "No")
                {
                  console.log("if..");
                  const sqlUpdateCategory= "UPDATE users SET user_email = ?,user_name = ?,user_province = ?,user_cityname = ?,user_lotno = ?,user_streetname = ?,user_postalcode = ?,user_contactno = ?,alternate_contact = ? WHERE user_id = ?";
                  db.query(sqlUpdateCategory,[email,username,province,cityname,lotno,streetname,postalcode,contact,altcontact,userId],(err,result)=>{
               
                     if(err)
                     {
                        console.log(err);
                     }
                     else
                     {
                        res.send(result);
                     }
                  
                     })
                  
                }
                else if(imageChanged === "Yes" && req.files)
                {
                  console.log("else if..");
                
                  fileName=Date.now()+"-"+req.files.image.name;
                  let newpath=path.join(process.cwd(),'../src/images/dealer-images',fileName);
                  req.files.image.mv(newpath);
                  const sqlUpdateCategory= "UPDATE users SET user_email = ?,user_name = ?,user_province = ?,user_cityname = ?,user_lotno = ?,user_streetname = ?,user_postalcode = ?,user_contactno = ?,alternate_contact = ?,user_image = ? WHERE user_id = ?";
                  db.query(sqlUpdateCategory,[email,username,province,cityname,lotno,streetname,postalcode,contact,altcontact,fileName,userId],(err,result)=>{
               
                     if(err)
                     {
                        console.log(err);
                     }
                     else
                     {
                        res.send(result);
                     }
                  
                     });
                }
               
                   
               });
               
               
               userRouter.route("/dealerbycity")
               .post((req,res)=>{
                  const dealercityname=req.body.city_name;
                  console.log("**"+dealercityname);
                  const sqlinsertModel="SELECT * FROM users WHERE user_cityname = ?";
                  db.query(sqlinsertModel,[dealercityname], (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });

               userRouter.route("/dealerbyprovince")
               .post((req,res)=>{
                  const dealerprovince=req.body.province;
                  console.log("**"+dealerprovince);
                  const sqlinsertModel="SELECT * FROM users WHERE user_province = ?";
                  db.query(sqlinsertModel,[dealerprovince], (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });

               userRouter.route("/getDealerByCity")
               .post((req,res)=>{
                  const city_name=req.body.city_name;
                  const dealer_name=req.body.dealer_name;
                  const sqlinsertModel="SELECT * FROM users WHERE user_cityname = ? AND user_name"+ " like '%"+dealer_name+ "%'";
                  db.query(sqlinsertModel,[city_name], (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });

               userRouter.route("/getDealerByProvince")
               .post( (req,res)=>{
                  const dealerprovince=req.body.province;
                  const dealer_name=req.body.dealer_name;
                  const sqlinsertModel="SELECT * FROM users WHERE user_province = ? AND user_name"+ " like '%"+dealer_name+ "%'";
                  db.query(sqlinsertModel,[dealerprovince], (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });
               userRouter.route("/getDealerByOnlyName")
               .post((req,res)=>{
                  
                  console.log("Body"+JSON.stringify(req.body));
                  const dealer_name=req.body.dealer_name;
                  const sqlinsertModel="SELECT * FROM users WHERE user_name"+ " like '%"+dealer_name+ "%'";
                  db.query(sqlinsertModel, (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });
               userRouter.route("/search_bar")
               .post( (req,res)=>{
                  console.log(JSON.stringify(req.body));
                  const keyword=req.body.keyword;
                  //const location=req.body.location;
                  const sqlinsertModel="SELECT * FROM users WHERE user_province"+ " like '%"+keyword+"%'";
                  db.query(sqlinsertModel,(err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     else
                     {
                        if(result.length>0)
                        {
                           res.send(result);
                        }
                        else if(result.length===0)
                        {
                           const sqlinsertModel="SELECT * FROM users WHERE user_cityname"+ " like '%"+keyword+"%'";
                           db.query(sqlinsertModel,(err,result) =>{
                              if(err)
                              {
                                 console.log("error is:" + err);
                              }
                              else
                              {
                                 if(result.length>0)
                                 {
                                    res.send(result);
                                 }
                                 else if(result.length===0)
                                 {
                                      
                                    const sqlinsertModel="SELECT * FROM users WHERE user_name"+ " like '%"+keyword+"%'";
                           db.query(sqlinsertModel,(err,result) =>{
                              if(err)
                              {
                                 console.log("error is:" + err);
                              }
                              else
                              {
                                 if(result.length>0)
                                 {
                                    res.send(result);
                                 }
                                 else if(result.length===0)
                                 {
                                    res.send({Message:"Please try Some another Search Terms"});
                                 }
                              }
                             
                           });
                                 }
                              }
                             
                           });
                        }
                     }
                    
                  });
               });


               userRouter.route("/getDealerByAlphabet")
               .post( (req,res)=>{
                  const alphabet=req.body.alphabet;
                  
                  const sqlinsertModel="SELECT * FROM users WHERE user_name"+ " like '"+alphabet+ "%'";
                  db.query(sqlinsertModel, (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });

               userRouter.route("/getDealerByType")
               .post( (req,res)=>{
                  console.log("Body"+JSON.stringify(req.body));
                  const userType=req.body.userType;
                  
                  const sqlinsertModel="SELECT * FROM users WHERE user_type = ?";
                  db.query(sqlinsertModel,[userType], (err,result) =>{
                     if(err)
                     {
                        console.log("error is:" + err);
                     }
                     res.send(result);
                     console.log("result is:" + result);
                  });
               });
               userRouter.route("/sendQueryMessagePhone")
               .post((req,res)=>
               {
                  console.log(JSON.stringify(req.body));
                  
                  const queryName=req.body.queryName;
                  const queryYear=req.body.queryYear;
                  const queryMake=req.body.queryMake;
                  const queryModel=req.body.queryModel;
                  const queryPhone_No=req.body.queryPhone_No;
                  const queryEmail=req.body.queryEmail;
                 
                  client.messages.create({
                     from:"+12183048166",
                     to:"+919646807791",
                     body:"Hello "+queryName+" You will be contacted soon for "+queryYear+" "+queryMake+" "+queryModel+" that you are interested in buying on Carpages.ca. Thank you."
                  }).then((res)=>
                  {
                   console.log(res.data);
                  }).catch((e)=>{
                    console.log(e);
                  });
                  var mailOptions={
                     from:'vipularora44@gmail.com',
                     to:"vipularora900318@gmail.com",
                     subject:'carpgaes-canada - otp to reset Password',
                     html:`<h4>Hello Carpages</h4>
                           <h5>${queryName}</h5>
                            <p>${queryEmail} has requested for ${queryYear} ${queryMake} ${queryModel}. Please contact with your best feedback </p>
                            </p>
                           `  
                    }
                    transporterMail.sendMail(mailOptions,function(error,info)
               {
                  if(error)
                  {
                      console.log(error);
                  }
                  else
                  {
                     console.log("verification email sent to your email account ");
                  }
               });



               });



               var DeviceDetails={};;
               userRouter.route("/userDeviceInfo")
               .get((req,res)=>
               {
               
                  //console.log(JSON.stringify(req.session))
                  req.session.useragent= {
                     browser: req.useragent.browser,
                     version: req.useragent.version,
                     os: req.useragent.os,
                     platform: req.useragent.platform
                  }
                  DeviceDetails=req.session.useragent
                 console.log(JSON.stringify(req.session.useragent)+"..."+Date.now())
                  if(DeviceDetails !={})
                  {
                    res.send([DeviceDetails])
                  }
               });
               
               userRouter.route("/InsertuserDeviceInfo")
               .post((req,res)=>
               {
                  console.log(JSON.stringify(req.body));
                  console.log("DeviceDetails"+JSON.stringify(DeviceDetails));
                
                   const userId=req.body.userId;
                   const Browser= DeviceDetails.browser;
                   const version= DeviceDetails.version;
                   const os= DeviceDetails.os;
                   const platform=DeviceDetails.platform;
                   let date_time = new Date();
                 /*    let date = ("0" + date_time.getDate()).slice(-2);
                
                     // get current month
                     let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
               
                     // get current year
                     let year = date_time.getFullYear();
                   
                 var conditions=[];
                  var conditions2=[];
                  var values=[];
                  var values2=[];
                  if(userId)
                  {
                     conditions.push("");
                  }
                  if(Browser)
                  {
                     conditions.browser_info=Browser;
                  }
                  if(version)
                  {
                     conditions.browser_version=version;
                  }
                  if(os)
                  {
                     conditions.operating_system=os;
                  }
               
                  if(userId)
                  {
                     conditions2.user_id=userId;
                  }
                  if(Browser)
                  {
                     conditions2.browser_info=Browser;
                  }
                  if(version)
                  {
                     conditions2.browser_version=version;
                  }
                  if(os)
                  {
                     conditions2.operating_system=os;
                  }
                  if(platform)
                  {
                     conditions2.platform_info=platform;
                  }
                  if(year && month && date)
                  {
                     conditions2.created=new Date();
                  }
                  if(year && month && date)
                  {
                     conditions2.last_signin=new Date();
                  }
                  console.log("Conditions"+"...."+JSON.stringify(conditions));*/
                 
                  if(userId && Browser && version && os && platform)
                  {
                     console.log("Inside Condition");
                    const sqlinsertModel1="SELECT * FROM device_browsers WHERE user_id = ? AND browser_info = ? AND browser_version = ? AND operating_system = ? AND platform_info = ? ";
                    db.query(sqlinsertModel1,[userId,Browser,version,os,platform],(err,result)=>
                    {
                       if(result.length>0)
                       {
                           
                            const sqlinsertModel="UPDATE device_browsers set last_signin = ? WHERE user_id = ? AND browser_info = ? AND browser_version = ? AND operating_system = ? AND platform_info = ?  ";
                              db.query(sqlinsertModel,[date_time,userId,Browser,version,os,platform],(err1,result1)=>
                              {
                                 if(!err1)
                                 {
                                    res.send(result1);
                                 }
                                 else if(err1)
                                 {
                                    res.send(err1);
                                 }
                              })
                              
                       }
                       else if(err)
                       {
                          res.send({Message:"Data Not Found..."});
                       }
                       if(result.length<=0)
                       {
                             const sqlinsertModel="INSERT INTO device_browsers (user_id,browser_info,browser_version,operating_system,platform_info,created,last_signin) VALUES(?,?,?,?,?,?,?)";
                                db.query(sqlinsertModel,[userId,Browser,version,os,platform,date_time,date_time],(err2,result2)=>
                                 {
                                    if(!err2)
                                    {
                                       res.send(result2);
                                    }
                                    else if(err2)
                                    {
                                       res.send(err2);
                                    }
                                 })
                       }
                    });


                   
                  }
                  

               });


               userRouter.route("/GetuserDeviceInfo")
               .post((req,res)=>
               {
                  const userId=req.body.userId;
                  const sqlinsertModel1="SELECT * FROM device_browsers WHERE user_id = ?";
                  db.query(sqlinsertModel1,[userId],(err,result)=>
                  {
                     if(result.length>0)
                     {
                        res.send(result);
                     }
                     else if(err)
                     {
                        res.send(err);
                     }
                  });
                  
               
               });

              
               
               userRouter.route("/DeleteuserDeviceInfo")
               .post((req,res)=>
               {
                  console.log("Inside Condition");
                  const Id=req.body.Id;
                  const sqlinsertModel1="DELETE FROM device_browsers WHERE _id = ?";
                  db.query(sqlinsertModel1,[Id],(err,result)=>
                  {
                     console.log("Inside result"+JSON.stringify(result));
                     if(result)
                     {console.log("Inside response");
                        res.send(result);
                     }
                     else if(err)
                     {
                        res.send(err);
                     }
                  });
               });



    module.exports = userRouter; 