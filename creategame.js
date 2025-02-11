var express = require('express') // import express
var database = require('./database') // import mysql access
var router = express.Router(); 

router.use(express.urlencoded({ extended: true })); // Middleware to parse form data

router.post("/created", (req,res) =>{
    
    const {leader, maxCards} = req.body;

    database.createGame(leader, maxCards, (err, gameCode) => {
        if (err) {
            return res.status(500).send("Error creating game: " + err.message);
        }
        res.send(`<h2> Game Created! Share this code ${gameCode}</h2>`)
    });
})

module.exports = router;