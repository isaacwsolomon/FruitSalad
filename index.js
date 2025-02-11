var express = require('express') 
var app = express(); 

const db = require('./database'); // Import the database

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