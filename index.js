var express = require('express') 
var app = express(); 

const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to DB
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
})
//Create Table

//Drop Table
// Route for the home page
app.get("/", (req, res) => {
    res.sendFile(__dirname +"/" + "views/homepage.html"); // Render the homepage view
});

app.get("/joingame", (req, res) => {
    res.sendFile(__dirname + "/" + "views/joingame.html"); // Render joingame page
})

app.get("/creategame", (req,res) => {
    res.sendFile(__dirname + "/" + "views/creategame.html");
})
app.listen(3004, () => { 
    console.log("Server is listening") 
})