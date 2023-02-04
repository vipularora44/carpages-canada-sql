const express=require("express");
let watchlist =express.Router();
const db=require("../dbconn");
const path=require("path");


watchlist.route("/getUserWatchList")
.post((req,res)=>{
    console.log("working here"+JSON.stringify(req.body));
    const userId=req.body.userId;
    const sqlinsertMake="SELECT listing_id FROM watchlist WHERE user_id=?";
    db.query(sqlinsertMake,[userId],(err,result)=>{
 
    if(err)
    {
       console.log(err);
    }
    else
    {
     res.send(result);
    }
    });
 });

 watchlist.route("/getUserWatchList1")
 .post((req,res)=>{
    console.log("working getUserWatchList1"+JSON.stringify(req.body));
    const listings=req.body.listings;
    const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_id='1' WHERE listings.listing_id IN(?)  ";
    db.query(sqlinsertMake,[listings],(err,result)=>{
 
    if(err)
    {
       console.log(err);
    }
    else
    {
     res.send(result);
    }
    });
 });

 watchlist.route("/deleteWatchList")
 .post((req,res)=>{
 
    const userId=req.body.userId;
    const listing_id=req.body.listing_id;
    const sqlinsertMake="DELETE FROM watchlist WHERE user_id=? AND listing_id=? ";
    db.query(sqlinsertMake,[userId,listing_id],(err,result)=>{
 
    if(err)
    {
       console.log(err);
    }
    else
    {
     res.send(result);
    }
    });
 });

 watchlist.route("/insertWatchList")
 .post((req,res)=>{
    console.log("WatchList working "+JSON.stringify(req.body));
    const userId=req.body.userId;
    const listing_id=req.body.listing_id;
    const sqlinsertMake="SELECT * FROM watchlist WHERE user_id=? AND listing_id=?";
    db.query(sqlinsertMake,[userId,listing_id],(err,result)=>{
 
    if(err)
    {
       console.log(err);
    }
    else
    {
       console.log(result.length+"....."+JSON.stringify(result));
       if(result.length <="0")
       {
         console.log("Result kidan.."+JSON.stringify(result));
        const sqlinsertMake="INSERT INTO watchlist (user_id,listing_id) VALUES (?,?)";
          db.query(sqlinsertMake,[userId,listing_id],(err1,result1)=>{
          if(err1)
          {
             console.log(err1);
          }
          else
          {
             res.send(result1);
          }
          });
       }
       else
       {
          res.send({message:"Vehicle Aready Added"})
       }
   
    }
 
    });
 });

 module.exports = watchlist; 