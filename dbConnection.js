const mysql=require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"loginsystem"
});

con.connect((error)=>{
    if (error){
        throw error;
    }
    else{
        console.log("Connected with the Database");
    }
})

module.exports={
    con
}