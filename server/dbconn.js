const mysql = require("mysql");
const db = mysql.createConnection({
    host: "carpages-canada.c34a68yso4g5.ap-south-1.rds.amazonaws.com",
    user:  "admin",
    password: "vipularora",
    port: 3306,
    database: "carpages_canada_sql",
    
 });
 module.exports= db;