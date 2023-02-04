const express=require("express");
let categoriesRouter =express.Router();
const db=require("../dbconn");


//Api for vehicle prices
categoriesRouter.route("/getprices")
.get((req,res) =>{
    const sqlSelect = "SELECT * FROM prices";
    db.query(sqlSelect,(err,result) =>{
      res.send(result);
    });
    });
    

//Api for vehicle Category 
categoriesRouter.route("/viewcategory")
.get((req,res) =>{
    const sqlSelect = "SELECT * FROM vehicle_category";
    db.query(sqlSelect,(err,result) =>{
      res.send(result);
    });
    });

   //Api for years 
   categoriesRouter.route("/years")
   .get((req,res) =>{
    const sqlSelect = "SELECT * FROM vehicle_years";
    db.query(sqlSelect,(err,result) =>{
      res.send(result);
    });
    });

//Api for vehicle Makes 
categoriesRouter.route("/makes")
.get((req,res) =>{
    const sqlSelect="SELECT * FROM vehicle_make";
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

//Api for Locations
categoriesRouter.route("/onlycities")
.get((req,res) =>{
    const sqlSelect="SELECT * FROM locations";
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

  categoriesRouter.route("/getlocations")
 .post((req,res) =>{
    const province=req.body.province;
    const sqlSelect="SELECT * FROM locations WHERE province_name= ?";
    db.query(sqlSelect,[province],(err,result1)=>{
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

//Api for vehicle Models 
 categoriesRouter.route("/models")
.post( (req,res) =>{
    const makename=req.body.makename;
    console.log("its working here"+makename);
    const sqlSelect="SELECT * FROM models WHERE make_name= ?";
    db.query(sqlSelect,[makename],(err,result1)=>{
       if(err)
       {
          console.log("err type:" + err);
       }
       else
       {
          res.send(result1);
       console.log(result1);}
    });
 });


 categoriesRouter.route("/insertmodel")
 .post((req,res)=>{
   
    const modelname=req.body.model;
    const makename=req.body.makename;
    console.log("working here" +modelname + makename);
    const sqlinsertModel="INSERT INTO models (make_name, make_model) VALUES (?,?)";
    db.query(sqlinsertModel,[makename,modelname], (err,result) =>{
       if(err)
       {
          console.log("error is:" + err);
       }
       res.send(result);
    });
 });

 categoriesRouter.route("/insertcategory")
 .post((req,res)=>{
    console.log("working here");
    const category=req.body.category;
    const sqlinsertCategory="INSERT INTO vehicle_category (category_name) values(?)";
    db.query(sqlinsertCategory,[category],(err,result)=>{
 
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


  categoriesRouter.route("/insertprices")
 .post((req,res)=>{
    const price=req.body.pricesadd;
    const sqlQ="INSERT INTO prices (vehicle_prices) values (?)";
    db.query(sqlQ,[price],(err,result)=>{
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

    categoriesRouter.route("/insertyears")
    .post((req,res)=>{
        const years=req.body.years;
        const sqlQ="INSERT INTO vehicle_years (years) values (?)";
        db.query(sqlQ,[years],(err,result)=>{
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

        categoriesRouter.route("/insertlocation")
        .post((req,res)=>{
   
            const cityname=req.body.cityname;
            const province=req.body.provinceName;
            console.log(cityname+"*loc*"+province);
            const sqlinsertCategory="INSERT INTO locations (city_name, province_name) values(?,?)";
            db.query(sqlinsertCategory,[cityname,province],(err,result)=>{
         
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

         categoriesRouter.route("/updatevehcategory")
         .post((req,res)=>{
            const catname=req.body.category;
            const previouscatname=req.body.previouscategory;
            console.log(catname+"..."+previouscatname);
            const sqlUpdateCategory= "UPDATE vehicle_category SET category_name = ? WHERE category_name = ? ";
            db.query(sqlUpdateCategory,[catname,previouscatname],(err,result)=>{
         
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


         categoriesRouter.route("/updateyears")
         .post((req,res)=>{
            const oldyears=req.body.oldyears;
            const newyears=req.body.newyears;
            console.log(oldyears+"..."+newyears);
            const sqlUpdateCategory= "UPDATE vehicle_years SET years = ? WHERE years = ? ";
            db.query(sqlUpdateCategory,[newyears,oldyears],(err,result)=>{
         
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
         

         categoriesRouter.route("/updatetmake")
         .post((req,res)=>{
            const newmakename=req.body.newmakename;
            const oldmakename=req.body.oldmakename;
            console.log(newmakename+"..."+oldmakename);
            const sqlUpdateCategory= "UPDATE vehicle_make SET make_name = ? WHERE make_name = ? ";
            db.query(sqlUpdateCategory,[newmakename,oldmakename],(err,result)=>{
         
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


         categoriesRouter.route("/updateModel")
         .post((req,res)=>{
            const previousmodel=req.body.oldmodel;
            const makename=req.body.makename;
            const newmodelname=req.body.newmodel;
            console.log(previousmodel+"..."+makename+"..."+newmodelname);
            const sqlUpdateCategory= "UPDATE models SET make_model = ? WHERE make_name = ? AND make_model = ?";
            db.query(sqlUpdateCategory,[previousmodel,makename,newmodelname],(err,result)=>{
         
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


         categoriesRouter.route("/updatelocation")
         .post((req,res)=>{
            const newcityname=req.body.newcityname;
            const oldcityname=req.body.oldcityname;
            const provinceName=req.body.provinceName;
            console.log(newcityname+"..."+oldcityname+"..."+provinceName);
            const sqlUpdateCategory= "UPDATE locations SET city_name = ? WHERE province_name = ? AND city_name = ?";
            db.query(sqlUpdateCategory,[newcityname,provinceName,oldcityname],(err,result)=>{
         
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



         categoriesRouter.route("/deletelocation")
         .post((req,res)=>{
   
            const cityname=req.body.cityname;
            const provinceName=req.body.provinceName;
            console.log("..."+cityname+"..."+provinceName);
            const sqlUpdateCategory= "DELETE FROM  locations WHERE city_name = ? AND province_name = ?";
            db.query(sqlUpdateCategory,[cityname,provinceName],(err,result)=>{
         
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


         categoriesRouter.route("/deletevehcategory")
         .post((req,res)=>{
            const catname=req.body.category;
            //const previouscatname=req.body.previouscategory;
            console.log("..."+catname);
            const sqlUpdateCategory= "Delete FROM vehicle_category  WHERE category_name = ? ";
            db.query(sqlUpdateCategory,[catname],(err,result)=>{
         
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


         categoriesRouter.route("/deleteprices")
         .post((req,res)=>{
            const price=req.body.price;
            //const previouscatname=req.body.previouscategory;
            console.log("..."+price);
            const sqlUpdateCategory= "Delete FROM prices  WHERE vehicle_prices = ? ";
            db.query(sqlUpdateCategory,[price],(err,result)=>{
         
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


         categoriesRouter.route("/deleteyears")
         .post((req,res)=>{
            const year=req.body.year;
            //const previouscatname=req.body.previouscategory;
            console.log("..."+year);
            const sqlUpdateCategory= "Delete FROM vehicle_years  WHERE years = ? ";
            db.query(sqlUpdateCategory,[year],(err,result)=>{
         
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

         categoriesRouter.route("/deletemake")
         .post((req,res)=>{
            const makename=req.body.makename;
            //const previouscatname=req.body.previouscategory;
            console.log("..."+makename);
            const sqlUpdateCategory= "Delete FROM vehicle_make  WHERE make_name = ? ";
            db.query(sqlUpdateCategory,[makename],(err,result)=>{
         
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
         
         categoriesRouter.route("/insertmake")
         .post( (req,res)=>{
            console.log("working here");
            const makename=req.body.makename;
            const sqlinsertMake="INSERT INTO vehicle_make (make_name) values(?)";
            db.query(sqlinsertMake,[makename],(err,result)=>{
         
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


         categoriesRouter.route("/getchoosedmakes")
         .post((req,res) =>{
            const makename=req.body.makesarr;
            console.log(JSON.stringify(req.body)+"its working here"+makename);
            const sqlSelect="SELECT * FROM models WHERE make_name IN(?)";
            db.query(sqlSelect,[makename],(err,result1)=>{
               if(err)
               {
                  console.log("err type:" + err);
               }
               else
               {
                  res.send(result1);
               console.log(result1);}
            });
         });
         
         categoriesRouter.route("/popularcities")
         .get((req,res) =>{
   
            const sqlSelect="SELECT * FROM locations WHERE location_type='popular' OR location_type='major' OR location_type='city'";
            db.query(sqlSelect,(err,result1)=>{
               if(err)
               {
                  console.log("err type:" + err);
               }
               else
               {
                  res.send(result1);
               //  console.log(result1);
               }
            });
         });




module.exports = categoriesRouter; 