const express=require("express");
let listingsRouter =express.Router();
const db=require("../dbconn");
const path=require("path");

listingsRouter.route("/get_allListings")
.get((req,res) =>{
  
    const sqlSelect="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type ='primary' JOIN users ON listings.seller_id =users.user_id  ";
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

 listingsRouter.route("/get_allListings_images")
 .get((req,res) =>{
  
    const sqlSelect="SELECT * FROM listing_images";
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

 listingsRouter.route("/getListingId")
 .get( (req,res) => {
  
    const sqlcreateAccount ="SELECT MAX(listing_id) AS 'MaximumValue' FROM listings";
 
    db.query(sqlcreateAccount,(err,result) => {
       if(err)
       {
          console.log(err);
       }
       else{
          console.log("res:"+JSON.stringify(result));
          res.send(result);}
    });
    });

    listingsRouter.route("/getUserListings")
    .post((req,res) => {
      
        const userId=req.body.userId;
        const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' JOIN users ON listings.seller_id =users.user_id WHERE listings.seller_id= ?";
     
        db.query(sqlinsertMake,[userId],(err,result) => {
           if(err)
           {
              console.log(err);
           }
           else{
              console.log("res:"+JSON.stringify(result));
              res.send(result);}
        });
        });
  

    listingsRouter.route("/insert_listing")
    .post((req,res) => {

      console.log("res:"+JSON.stringify(req.body));
      console.log("res:"+JSON.stringify(req.files));     
          const sellerid=req.body.Sellerid; 
           const Seller_name=req.body.Seller_name; 
           const city_name=req.body.city_name; 
           const province_name=req.body.province_name; 
           const seller_address=req.body.seller_address;
           const make=req.body.make; 
           const model=req.body.model; 
           const trim=req.body.trim; 
           const year=req.body.year;
           const mileage=req.body.mileage; 
           const price=req.body.price;
           const vin_no=req.body.vin_no;
           const stock_no=req.body.stock_no; 
           const exterior_colour=req.body.exterior_colour; 
           const interior_colour=req.body.interior_colour;
           const body_style=req.body.body_style;
           const fuel_type=req.body.fuel_type; 
           const drivetrain=req.body.drivetrain;
           const transmission=req.body.transmission; 
           const engine_type=req.body.engine_type; 
           const doors=req.body.doors; 
           const seats=req.body.seats;
           const vehicle_discription=req.body.vehicle_discription; 
           const cc=req.body.cc; 
           const power=req.body.power; 
           const torque=req.body.torque;
           const fuelcapacity=req.body.fuelcapacity;
           const fuelconsumptioncity=req.body.fuelconsumptioncity; 
           const fuelconsumptionhighway=req.body.fuelconsumptionhighway;
           const safety=req.body.safety;
           const assistance=req.body.assistance;const lighting=req.body.lighting;const infotainment=req.body.infotainment;const connectivity=req.body.connectivity;
           const comfort=req.body.comfort;const convenience=req.body.convenience;const exterior=req.body.exterior;const security=req.body.security;
           const sale_status=req.body.sale_status;
           const transmission_type=req.body.transmission_type;
           
           var Image_Array=[];
           var joined_images=[];
           const ListingId=req.body.ListingId;
           const vehicle_top_features=req.body.vehicle_top_features;
           console.log("ListingId"+ListingId);
           console.log();
         
          
           if(req.files)
           {
            let firstimage="";
            const file = req.files.kidan;
          
               console.log(firstimage+"filename");
            setTimeout(()=>{
               const sqlcreateAccount = "INSERT INTO listings (seller_id,seller_name,city_name,province_name,seller_address,make_name,model_name,trim_name,model_year,mileage,price,vin_no,stock,exterior_color,"+
            "interior_color,bodystyle,fuel_type,drivetrain,transmission,transmission_type,engine,doors,seats,vehicle_description,engine_cc,engine_power,engine_torque,"+
            "fuel_capacity,fuel_consumption_city,fuel_consumption_highway,safety,"
            +"driver_assistance,lighting,infotainment,connectivity,comfort,convenience,exterior,security,vehicle_top_features,sale_status)"+
            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                 db.query(sqlcreateAccount,[sellerid,Seller_name,city_name,province_name,seller_address,make,model,trim,year,mileage,price,vin_no,stock_no,exterior_colour,interior_colour,body_style,fuel_type,drivetrain,
            transmission,transmission_type,engine_type,doors,seats,vehicle_discription,cc,power,torque,fuelcapacity,fuelconsumptioncity,fuelconsumptionhighway,safety,
            assistance,lighting,infotainment,connectivity,comfort,convenience,exterior,security,vehicle_top_features,sale_status], (err,result) => {
                    if(err)
                    {
                       console.log(err);
                    }
                    else{
                    console.log(result);
                    res.send(result);
                    if(result.insertId && result.affectedRows)
                    {
                     if(req.files)
                     {
                        
                        for(let i = 0 ; i < file.length; i++)
                         { 
                           const j=i+1;
                           let filename= Date.now()+"-"+file[i].name;
                           if(i === 0)
                           {
                              firstimage="primary";
                           }
                           else
                           {
                              firstimage="secondary";
                           }
                  
                           console.log(firstimage+"filename"+filename);
                           let newpath=path.join(process.cwd(),'../src/images/listing_images/',filename);
                           
                           file[i].mv(newpath, function (err){
                              if(err){
                                   res.send(err);
                              }
                           });
                                const sqlUpdateCategory1= "INSERT INTO listing_images (listing_id,image_name,image_id,image_type) VALUES (?,?,?,?)";
                                 db.query(sqlUpdateCategory1,[result.insertId,filename,j,firstimage],(err,result)=>{
                           
                                 if(err)
                                 {
                                    console.log("Error"+err);
                                 }
                                 else
                                 {
                                 
                                 }
                              
                                 });
                        } }
                    }
                  }
                 });
                    },6000);
          
         }
              else {
               joined_images="default.jfif";
               console.log("Image Array:"+joined_images);
                        const sqlcreateAccount = "INSERT INTO listings (seller_id,seller_name,city_name,province_name,seller_address,make_name,model_name,trim_name,model_year,mileage,price,vin_no,stock,exterior_color,"+
           "interior_color,bodystyle,fuel_type,drivetrain,transmission,transmission_type,engine,doors,seats,vehicle_description,engine_cc,engine_power,engine_torque,"+
           "fuel_capacity,fuel_consumption_city,fuel_consumption_highway,safety,"
           +"driver_assistance,lighting,infotainment,connectivity,comfort,convenience,exterior,security,vehicle_top_features,sale_status)"+
           " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                db.query(sqlcreateAccount,[sellerid,Seller_name,city_name,province_name,seller_address,make,model,trim,year,mileage,price,vin_no,stock_no,exterior_colour,interior_colour,body_style,fuel_type,drivetrain,
                  transmission,transmission_type,engine_type,doors,seats,vehicle_discription,cc,power,torque,fuelcapacity,fuelconsumptioncity,fuelconsumptionhighway,safety,
                  assistance,lighting,infotainment,connectivity,comfort,convenience,exterior,security,vehicle_top_features,sale_status], (err,result) => {
                   if(err)
                   {
                      console.log(err);
                   }
                   else
                   {
                   console.log(result);
                   for(let i = 0 ; i < joined_images.length; i++)
                   { 
                         const j=i+1;
                        
                         if(i === 0)
                         {
                            firstimage="primary";
                         }
                         
                                       
                              const sqlUpdateCategory1= "INSERT INTO listing_images (listing_id,image_name,image_id,image_type) VALUES (?,?,?,?)";
                               db.query(sqlUpdateCategory1,[ListingId,joined_images,j,firstimage],(err,result)=>{
                         
                               if(err)
                               {
                                  console.log("Error"+err);
                               }
                               else
                               {
                                //  res.send(result);
                               }
                            
                               });
                      }
                  }
                });
                  }
          
            });
   
            
    listingsRouter.route("/insert_New_Images")
    .post((req,res) => {

                const file = req.files.images;
                var MaxId=req.body.ImageId;
                const ListingId=req.body.Listingid;
                var j=0;
                if(req.files)
                {
                   console.log(file+"Files.."+JSON.stringify(req.files));
                   for(let i = 0 ; i < file.length; i++)
                   {  
                      
                         if(MaxId)
                         {
                            j=+ MaxId + i + 1;
                         }
                         else
                         {
                            j=i+1;
                         }
                         console.log('ImageId'+j+'MaxId...'+MaxId);
                         let filename= Date.now()+"-"+file[i].name;
                       
                
                         
                         let newpath=path.join(process.cwd(),'../src/images/listing_images/',filename);
                         
                         file[i].mv(newpath, function (err){
                            if(err){
                                 res.send(err);
                            }
                         });
                              const sqlUpdateCategory1= "INSERT INTO listing_images (listing_id,image_name,image_id,image_type) VALUES (?,?,?,'secondary')";
                               db.query(sqlUpdateCategory1,[ListingId,filename,j],(err,result)=>{
                         
                               if(err)
                               {
                                  console.log("Error"+err);
                               }
                               else
                               {
                                //  res.send(result);
                               }
                               });
                      } 
                }
                });

    listingsRouter.route("/getListingDetail")
    .post((req,res) => {
  
                    const ListingId=req.body.ListingId;
                    
                    const sqlcreateAccount = "SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' JOIN users ON listings.seller_id =users.user_id WHERE listings.listing_id = ?";
                   
                       db.query(sqlcreateAccount,[ListingId], (err,result) => {
                          if(err)
                          {
                             console.log(err);
                          }
                          else{
                             res.send(result);
                          }
                       });
                      
                    });


                    listingsRouter.route("/updatetSaleStatus")
                    .post((req,res) => {
                  
                                    const ListingId=req.body.ListingId;
                                    const status=req.body.status;
                           
                                    const sqlcreateAccount = "UPDATE listings SET sale_status ='"+status+"' WHERE listing_id = ?";
                                   
                                       db.query(sqlcreateAccount,[ListingId], (err,result) => {
                                          if(err)
                                          {
                                             console.log(err);
                                          }
                                          else{
                                             res.send(result);
                                          }
                                       });
                                      
                                    });

                                    listingsRouter.route("/FilterByListingSellertype")
                                    .post((req,res) => {
                                  
                                                    const ListingSellertype=req.body.ListingSellertype;
                                                    console.log(JSON.stringify(req.body));
                                                    var sqlSelect="";
                                                    if(ListingSellertype==="private")
                                                    {
                                                      sqlSelect="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type ='primary' JOIN users ON listings.seller_id =users.user_id AND users.user_type = 'private'";
                                                    }
                                                    else if(ListingSellertype==="dealer")
                                                    {
                                                      sqlSelect="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type ='primary' JOIN users ON listings.seller_id =users.user_id AND users.user_type = 'dealer'";
                                                    }
                                                    else if(ListingSellertype==="sold")
                                                    {
                                                      sqlSelect="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type ='primary' JOIN users ON listings.seller_id =users.user_id WHERE listings.sale_status ='sold'";

                                                    }
                                                   
                                                       db.query(sqlSelect, (err,result) => {
                                                          if(err)
                                                          {
                                                             console.log(err);
                                                          }
                                                          else{
                                                             res.send(result);
                                                             //console.log(result);
                                                          }
                                                       });
                                                      
                                                    });
                
    listingsRouter.route("/getListingImages")
    .post((req,res) => {
  
                        const ListingId=req.body.ListingId;
                        
                        const sqlcreateAccount = "SELECT * FROM listing_images WHERE listing_id = ?";
                       
                           db.query(sqlcreateAccount,[ListingId], (err,result) => {
                              if(err)
                              {
                                 console.log(err);
                              }
                              else{
                                 res.send(result);
                              }
                           });
                          
                        });


    listingsRouter.route("/updatePrimaryListingImage")
    .post((req,res) => {
  
                            const ListingId=req.body.listingId;
                            const imageName=req.body.imageName;
                            const imageId=req.body.imageId;
                            console.log(JSON.stringify(req.body));
                            const sqlUpdateCategory= "UPDATE listing_images SET image_type ='primary' WHERE listing_id = ? AND image_id=?";
                                              db.query(sqlUpdateCategory,[ListingId,imageId],(err,result)=>{
                                                 if(err)
                                                 {
                                                    console.log(err);
                                                 }
                                                 else
                                                 {
                                                    res.send(result);
                                                    if(result)
                                                    {
                                                            const sqlUpdateCategory= "UPDATE listing_images SET image_type ='secondary' WHERE listing_id = ? AND NOT image_id=?";
                                                            db.query(sqlUpdateCategory,[ListingId,imageId],(err,result)=>{
                                                               if(err)
                                                               {
                                                                  console.log(err);
                                                               }
                                                               else
                                                               {

                                                               } 
                                                         });  
                                                    }
                                                 }
                                                 });
                              
                            });
    
     listingsRouter.route("/deleteListingImages")                      
     .post((req,res) => {
  
                                const ListingId=req.body.listingId;
                                const imageName=req.body.imageName;
                                const imageId=req.body.imageId;
                                console.log("deleteListingImages"+JSON.stringify(req.body));
                                   
                                         const sqlcreateAccount = "Delete FROM listing_images WHERE listing_id =? AND image_name =? AND image_id =?";
                               
                                         db.query(sqlcreateAccount,[ListingId,imageName,imageId], (err,result) => {
                                            if(err)
                                            {
                                               console.log(err);
                                            }
                                            else{
                                               res.send(result);
                                            }
                                         });
                                     
                                });                            
     
     listingsRouter.route("/getmoreListings")                                
    .post((req,res) => {
                                    console.log("getmoreListings");
                                    const userId=req.body.userId;
                                    const listingId=req.body.ListingId;
                                    console.log("getmoreListings"+JSON.stringify(req.body));
                                    
                                    const sqlcreateAccount = "SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE NOT listings.listing_id = ? AND listings.seller_id = ? LIMIT 3";
                                   
                                       db.query(sqlcreateAccount,[listingId,userId], (err,result) => {
                                          if(err)
                                          {
                                             console.log(err);
                                          }
                                          else{
                                             res.send(result);
                                          }
                                       });
                                      
                          
                          
                                });                          

     listingsRouter.route("/FilterByCityListings") 
    .post((req,res)=>{
                                    const cityname=req.body.cityname;
                                    const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.city_name= ?";
                                    db.query(sqlinsertMake,[cityname],(err,result)=>{
                                 
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

     listingsRouter.route("/getDealerListings") 
     .post((req,res)=>{
                                    const userId=req.body.userId;
                                    const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.seller_id= ?";
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

     listingsRouter.route("/getDealervehicleCount") 
     .post((req,res)=>{
                                    var datavalues=[];
                                    var conditions=[];
                                     
                                    const userId=req.body.userId;
                                    const body_style=req.body.body_style;
                                    if(body_style)
                                    {
                                       const sqlinsertMake="SELECT make_name,COUNT(*) as Total FROM listings WHERE seller_id= ? AND bodystyle= ? GROUP BY make_name ";
                                    
                                       db.query(sqlinsertMake,[userId,body_style],(err,result)=>{
                                    
                                       if(err)
                                       {
                                          console.log(err);
                                       }
                                       else
                                       {
                                        res.send(result);
                                        console.log("counts"+JSON.stringify(result));
                                       }
                                    });
                                    }
                                    else
                                    {
                                       const sqlinsertMake="SELECT make_name,COUNT(*) as Total FROM listings WHERE seller_id= ? GROUP BY make_name ";
                                       db.query(sqlinsertMake,[userId],(err,result)=>{
                                       if(err)
                                       {
                                          console.log(err);
                                       }
                                       else
                                       {
                                        res.send(result);
                                        console.log("counts"+JSON.stringify(result));
                                       }
                                    });
                                    }
                                    
                                 });

      listingsRouter.route("/getDealervehicleModelCount")
     .post((req,res)=>{
                                    const userId=req.body.userId;
                                    const make_name=req.body.make_name;
                                    const sqlinsertMake="SELECT model_name,COUNT(*) as Total FROM listings WHERE seller_id= ? AND make_name= ? GROUP BY model_name ";
                                    
                                    db.query(sqlinsertMake,[userId,make_name],(err,result)=>{
                                 
                                    if(err)
                                    {
                                       console.log(err);
                                    }
                                    else
                                    {
                                     res.send(result);
                                     console.log("Model counts"+JSON.stringify(result));
                                    }
                                 });
                                 });
     
      listingsRouter.route("/updateListing")
     .post((req,res)=>{

                                    console.log("Body"+JSON.stringify(req.body));
                                    console.log("files"+JSON.stringify(req.files));
                                    const ListingId=req.body.ListingId;
                                    const make=req.body.make;
                                    const model=req.body.model;
                                    const trim=req.body.trim;
                                    const year=req.body.year;
                                    const mileage=req.body.mileage;
                                    const price=req.body.price;
                                    const vin_no=req.body.vin_no;
                                    const stock_no=req.body.stock_no;
                                    const exterior_colour=req.body.exterior_colour;
                                    const interior_colour=req.body.interior_colour;
                                    const body_style=req.body.body_style;
                                    const fuel_type=req.body.fuel_type;
                                    const drivetrain=req.body.drivetrain;
                                    const transmission=req.body.transmission;
                                    const transmission_type=req.body.transmission_type;
                                    const engine_type=req.body.engine_type;
                                    const doors=req.body.doors;
                                    const seats=req.body.seats;
                                    const vehicle_discription=req.body.vehicle_discription;
                                    const cc=req.body.cc;
                                    const power=req.body.power;
                                    const torque=req.body.torque;
                                    const fuelcapacity=req.body.fuelcapacity;
                                    const fuelconsumptioncity=req.body.fuelconsumptioncity;
                                    const fuelconsumptionhighway=req.body.fuelconsumptionhighway;
                                    const safety=req.body.safety;
                                    const assistance=req.body.assistance;
                                    const lighting=req.body.lighting;
                                    const infotainment=req.body.infotainment;
                                    const connectivity=req.body.connectivity;
                                    const comfort=req.body.comfort;
                                    const convenience=req.body.convenience;
                                    const exterior=req.body.exterior;
                                    const security=req.body.security;
                                    const vehicle_top_features=req.body.vehicle_top_features;
                                    
                                    const valves=[make,model,trim,year,mileage,price,vin_no,stock_no,exterior_colour,interior_colour,body_style,
                                       fuel_type,drivetrain,transmission,transmission_type,engine_type,doors,seats,vehicle_discription,cc,power,torque,fuelcapacity,
                                       fuelconsumptioncity,fuelconsumptionhighway,safety,assistance,lighting,infotainment,connectivity,comfort,convenience,exterior,
                                       security,vehicle_top_features,ListingId
                                    ];
                                 
                                 
                                    const sqlUpdateCategory= "UPDATE listings SET make_name =?,model_name =?,trim_name =?,model_year =?,mileage =?,price =?,vin_no =?,stock=?,"
                                    +"exterior_color =?,interior_color =?,bodystyle =?,fuel_type =?,drivetrain =?,transmission =?,transmission_type =?,engine =?,"
                                    +"doors =?,seats =?,vehicle_description =?,engine_cc =?,engine_power =?,engine_torque =?,fuel_capacity =?,fuel_consumption_city =?,fuel_consumption_highway =?,"
                                    +"safety =?,driver_assistance =?,lighting =?,infotainment =?,connectivity =?,comfort =?,convenience =?,exterior =?,security =?,vehicle_top_features =?"
                                    +" WHERE listing_id = ?";
                                    db.query(sqlUpdateCategory,valves,(err,result)=>{
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
                                 
      listingsRouter.route("/getDealerRefineInventory")
     .post((req,res)=>{
                                    const todaysDate = new Date();
                                    const currentYear = todaysDate.getFullYear();
                                    const seller_id=req.body.seller_id;
                                    const bodyStyle=req.body.bodyStyle;
                                    const selectedMake=req.body.selectedMake;
                                    const selectedModel=req.body.selectedModel;
                                    const selectedMinyear=req.body.selectedMinyear;
                                    const selectedMaxyear=req.body.selectedMaxyear;
                                   console.log("BODY..."+JSON.stringify(req.body));
                                   var Values=[];
                                   var conditions=[];
                                   if(seller_id.length>0)
                                   {
                                      conditions.push("listings.seller_id= ?")
                                      Values.push(seller_id);
                                   }
                                   if(bodyStyle.length>0)
                                   {
                                    conditions.push("listings.bodystyle= ?")
                                    Values.push(bodyStyle);
                                   }
                                   if(selectedMake.length>0)
                                   {
                                    conditions.push("listings.make_name= ?")
                                    Values.push(selectedMake);
                                   }
                                   if(selectedModel.length>0)
                                   {
                                    conditions.push("listings.model_name= ?")
                                    Values.push(selectedModel);
                                   }
                                   if(selectedMinyear.length>0 && selectedMaxyear.length>0)
                                   {
                                    conditions.push("listings.model_year BETWEEN (?) AND (?)");
                                    Values.push(selectedMinyear);
                                    Values.push(selectedMaxyear);
                                   }
                                   else if(selectedMinyear.length>0 && selectedMaxyear.length <=0)
                                   {
                                    conditions.push("listings.model_year BETWEEN (?) AND (?)");
                                    Values.push(selectedMinyear);
                                    Values.push(currentYear);
                                   }
                                   else if(selectedMinyear.length <=0 && selectedMaxyear.length>0)
                                   {
                                    const  MINYEAR=1950;
                                    conditions.push("listings.model_year BETWEEN (?) AND (?)");
                                    Values.push(MINYEAR);
                                    Values.push(selectedMaxyear);
                                   }
                                   var JoinedQuery="";
                                   if(conditions !=[])
                                    { JoinedQuery=conditions.join(' AND ');
                                     
                                       const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE "+JoinedQuery;
                                       console.log("sqlinsertMake...."+sqlinsertMake);
                                       console.log("vvalues...."+Values);
                                       db.query(sqlinsertMake,Values,(err,result)=>{
                                        if(err)
                                        {
                                           console.log(err);
                                        }
                                        else
                                        {
                                         res.send(result);
                                         console.log("Model counts"+JSON.stringify(result));
                                        }
                                     });
                                    }
                                 
                                 });    
                                 
      listingsRouter.route("/FilterByClassListings")
     .post( (req,res)=>{
                                    const vehicleClass=req.body.vehicleClass;
                                    console.log("vehicleClass"+vehicleClass);
                                    if(vehicleClass !="Hybrid / Gas" || vehicleClass !="Electric")
                                    {console.log("vehicleClass"+vehicleClass);
                                       const sqlinsertMake="SELECT * FROM  listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.bodystyle"+ " like '%"+vehicleClass+ "%'";
                                       
                                       db.query(sqlinsertMake,(err,result)=>{
                                    
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
                                    else if(vehicleClass ==="Electric")
                                    {
                                       console.log("vehiclefueltype"+vehicleClass);
                                       const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.fuel_type"+ " like '%"+vehicleClass+ "%'";
                                    db.query(sqlinsertMake,(err,result)=>{
                                 
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
    
     listingsRouter.route("/FilterByMakeListings")
    .post( (req,res)=>{
   
                                    const makename=req.body.makename;
                                    const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.make_name= ?";
                                    db.query(sqlinsertMake,[makename],(err,result)=>{
                                 
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

     listingsRouter.route("/Find_A_Car")
     .post( (req,res)=>{
                                    const todaysDate = new Date();
                                    const MaxPrice="400000";
                                    const MinPrice="0";
                                    const Maxmileage="350000";
                                    const Minmileage="0";
                                    const Make_name=req.body.Make_name;
                                    const Model_name=req.body.Model_name;
                                    const City_name=req.body.City_name;
                                    const Min_year=req.body.Min_year;
                                    const Max_Years=req.body.Max_Years;
                                    const Min_price=req.body.Min_price;
                                    const Max_price=req.body.Max_price;
                                    const Min_mileage=req.body.Min_mileage;
                                    const Max_mileage=req.body.Max_mileage;
                                    const currentYear = todaysDate.getFullYear();
                                    var conditions = [];
                                    var vvalues = [];
                                    var JoinedQuery="";
                                    if(!City_name=="")
                                    {
                                       conditions.push("listings.city_name=?");
                                       vvalues.push(City_name);
                                    }
                                    if(Model_name.length =='' && Make_name.length!='')
                                    {
                                       conditions.push("listings.make_name=?");
                                       vvalues.push(Make_name);
                                    }
                                    else if(Model_name.length!='')
                                    {
                                       conditions.push("listings.model_name=?");
                                       vvalues.push(Model_name);
                                    }
                                 
                                    if(Min_price!="" && Max_price!="" )
                                    {
                                       conditions.push("listings.price BETWEEN (?) AND (?)");
                                       vvalues.push(Min_price);
                                       vvalues.push(Max_price);
                                    }
                                    else if(Min_price!="" && Max_price=="" )
                                    {
                                       conditions.push("listings.price BETWEEN (?) AND (?)");
                                       vvalues.push(Min_price);
                                       vvalues.push(MaxPrice);
                                    }
                                    else if(Min_price=="" && Max_price!="" )
                                    {
                                       conditions.push("listings.price BETWEEN (?) AND (?)");
                                       vvalues.push(MinPrice);
                                       vvalues.push(Max_price);
                                    }
                                  
                                    if(conditions !=[])
                                    {
                                          
                                       JoinedQuery=conditions.join(' AND ');
                                       console.log(vvalues+"conditions..."+JoinedQuery);
                                   
                                    
                                    const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE "+JoinedQuery;
                                    console.log("sqlinsertMake...."+sqlinsertMake);
                                    console.log("vvalues...."+vvalues);
                                    db.query(sqlinsertMake,vvalues,(err,result)=>{
                                 
                                    if(err)
                                    {
                                       console.log(err);
                                    }
                                    else
                                    {
                                     res.send(result);
                                     console.log(result);
                                    }
                                    });
                                  }
                                 });

      listingsRouter.route("/getFilterListings")
     .post((req,res)=>{
                                    console.log("working here");
                                    const todaysDate = new Date();
                                    const MaxPrice="400000";
                                    const MinPrice="0";
                                    const Maxmileage="350000";
                                    const Minmileage="0";
                                    const currentYear = todaysDate.getFullYear();
                                    const cityname=req.body.cityname;
                                    const allmodels=req.body.allmodels;
                                    const buyfromHome=req.body.buyfromHome;
                                    const bodyStyle=req.body.bodyStyle;   
                                    const makename=req.body.makename;
                                    const modelname=req.body.modelname;
                                    const minyears=req.body.minyears;
                                    const maxyears=req.body.maxyears;
                                    const minprice=req.body.minprice;
                                    const maxprice=req.body.maxprice;
                                    const minmileage=req.body.minmileage;
                                    const maxmileage=req.body.maxmileage;
                                    const transmission=req.body.transmission;
                                    const drivetrain=req.body.drivetrain;
                                    const used_new=req.body.used_new;
                                    //const vehicleClass=req.body.vehicleClass;
                                    
                                    console.log(JSON.stringify(req.body));
                                    console.log("currentYear"+currentYear);
                                    
                                    var conditions = [];
                                    var vvalues = [];
                                    var JoinedQuery="";
                                    if(!cityname=="")
                                    {
                                       conditions.push("listings.city_name=?");
                                       vvalues.push(cityname);
                                    }
                                    if(!bodyStyle=="")
                                    {
                                       conditions.push("listings.bodystyle=?");
                                       vvalues.push(bodyStyle);
                                    }
                                    if(modelname.length==[] && makename.length!=[])
                                    {
                                       conditions.push("listings.make_name IN(?)");
                                       vvalues.push(makename);
                                    }
                                    else if(modelname.length!=[])
                                    {
                                       conditions.push("listings.model_name IN(?)");
                                       vvalues.push(modelname);
                                    }
                                    if(minyears!="" && maxyears!="" )
                                    {
                                       conditions.push("listings.model_year BETWEEN (?) AND (?)");
                                       vvalues.push(minyears);
                                       vvalues.push(maxyears);
                                    }
                                    else if(minyears!="" && maxyears=="" )
                                    {
                                       conditions.push("listings.model_year BETWEEN (?) AND (?)");
                                       vvalues.push(minyears);
                                       vvalues.push(currentYear);
                                    }
                                    else if(minyears=="" && maxyears!="" )
                                    {
                                       const  MINYEAR=1950;
                                       conditions.push("listings.model_year BETWEEN (?) AND (?)");
                                       vvalues.push(MINYEAR);
                                       vvalues.push(maxyears);
                                    }
                                    if(minprice!="" && maxprice!="" )
                                    {
                                       conditions.push("listings.price BETWEEN (?) AND (?)");
                                       vvalues.push(minprice);
                                       vvalues.push(maxprice);
                                    }
                                    else if(minprice!="" && maxprice=="" )
                                    {
                                       conditions.push("listings.price BETWEEN (?) AND (?)");
                                       vvalues.push(minprice);
                                       vvalues.push(MaxPrice);
                                    }
                                    else if(minprice=="" && maxprice!="" )
                                    {
                                       conditions.push("listings.price BETWEEN (?) AND (?)");
                                       vvalues.push(MinPrice);
                                       vvalues.push(maxprice);
                                    }
                                    if(minmileage!="" && maxmileage!="" )
                                    {
                                       conditions.push("listings.mileage BETWEEN (?) AND (?)");
                                       vvalues.push(minmileage);
                                       vvalues.push(maxmileage);
                                    }
                                    else if(minmileage!="" && maxmileage=="" )
                                    {
                                       conditions.push("listings.mileage BETWEEN (?) AND (?)");
                                       vvalues.push(minmileage);
                                       vvalues.push(Maxmileage);
                                    }
                                    else if(minmileage=="" && maxmileage!="" )
                                    {
                                       conditions.push("listings.mileage BETWEEN (?) AND (?)");
                                       vvalues.push(Minmileage);
                                       vvalues.push(maxmileage);
                                    }
                                    if(drivetrain!="")
                                    {
                                       conditions.push("listings.drivetrain=?");
                                       vvalues.push(drivetrain);
                                    }
                                    if(transmission==="Automatic" || transmission==="Manual")
                                    {
                                       conditions.push("listings.transmission=?");
                                       vvalues.push(transmission);
                                    }
                                    if(transmission==="Any")
                                    {
                                       conditions.push("listings.transmission IN(?)");
                                       vvalues.push(["Automatic","Manual"]);
                                    }
                                    if(used_new ==="new")
                                    {
                                       conditions.push("listings.mileage <=1000");
                                       //vvalues.push(used_new);
                                    }
                                    if(used_new ==="used")
                                    {
                                       conditions.push("listings.mileage >1000");
                                       //vvalues.push(used_new);
                                    }
                                    if(used_new ==="any")
                                    {
                                       conditions.push("listings.mileage >1");
                                       //vvalues.push(used_new);
                                    }
                                    if( buyfromHome)
                                    {
                                       conditions.push("listings.buy_from_home=?");
                                       vvalues.push("yes");
                                    }
                                    
                                  
                                    if(conditions !=[])
                                    {
                                          
                                       JoinedQuery=conditions.join(' AND ');
                                       console.log(vvalues+"conditions..."+JoinedQuery);
                                   
                                    
                                    const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE "+JoinedQuery;
                                    console.log("sqlinsertMake...."+sqlinsertMake);
                                    console.log("vvalues...."+vvalues);
                                    db.query(sqlinsertMake,vvalues,(err,result)=>{
                                 
                                    if(err)
                                    {
                                       console.log(err);
                                    }
                                    else
                                    {
                                     res.send(result);
                                     console.log(result);
                                    }
                                    });
                                  }
                                    
                                    
                                 });



                                 listingsRouter.route("/search_Bar")
                                 .post( (req,res)=>{
                                    console.log(JSON.stringify(req.body));
                                    const keyword=req.body.keyword;
                                  //const location=req.body.location;
                                  const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.model_name"+ " like '%"+keyword+"%'";
                                  db.query(sqlinsertMake, (err,result) =>{
                                       if(err)
                                       {
                                          console.log("error is:" + err);
                                       }
                                       else{
                                          if(result.length>0)
                                          { 
                                             res.send(result);
                                          }
                                          else if(result.length===0)
                                          {
                                             console.log("Empty Try more queries");
                                             const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.make_name"+ " like '%"+keyword+"%'";
                                             db.query(sqlinsertMake, (err,result) =>{
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
                                                                  const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.bodystyle"+ " like '%"+keyword+"%'";
                                                                  db.query(sqlinsertMake, (err,result) =>{
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
                                                                              const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.fuel_type"+ " like '%"+keyword+"%'";
                                                                              db.query(sqlinsertMake, (err,result) =>{
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
                                                                                       const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.transmission"+ " like '%"+keyword+"%'";
                                                                                       db.query(sqlinsertMake, (err,result) =>{
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
                                                                                                const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.transmission_type"+ " like '%"+keyword+"%'";
                                                                                                db.query(sqlinsertMake, (err,result) =>{
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
                                                                                                         const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.engine"+ " like '%"+keyword+"%'";
                                                                                                         db.query(sqlinsertMake, (err,result) =>{
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
                                                                                                                  const sqlinsertMake="SELECT * FROM listings LEFT JOIN listing_images ON listings.listing_id =listing_images.listing_id AND listing_images.image_type='primary' WHERE listings.vehicle_description"+ " like '%"+keyword+"%'";
                                                                                                                  db.query(sqlinsertMake, (err,result) =>{
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
                  
                                                                                                                        }
                                                                                                                     }
                                                                                                                  });
                                                                                                               }
                                                                                                            }
                                                                                                         });
                                                                                                      }
                                                                                                   }
                                                                                                });
                                                                                             }
                                                                                          }
                                                                                       });
                                                                                    }   
                                                                                     
                                                                                 }
                                                                              });
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
                  

module.exports = listingsRouter; 