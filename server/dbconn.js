const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user:  "root",
    password: "vipularora@180390",
    port: 3306,
    database: "carpages_canada",
    
 });
 module.exports= db;