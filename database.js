const sqlite3 = require('sqlite3').verbose();
let sql1, sql2, sql3;

//connect to DB
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
})
//Create Table
  sql1 = `CREATE TABLE IF NOT EXISTS gamedetails(id INTEGER PRIMARY KEY AUTOINCREMENT, 
  code TEXT UNIQUE, 
  leader TEXT, 
  max_cards INTEGER)`
  db.run(sql1);

sql2 = `CREATE TABLE IF NOT EXISTS players(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_code TEXT,
    name TEXT,
    team INTEGER,
    FOREIGN KEY(game_code) REFERENCES gamedetails(code))`

db.run(sql2);

sql3 = (`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_code TEXT,
    player_id INTEGER,
    content TEXT,
    FOREIGN KEY(game_code) REFERENCES gamedetails(code),
    FOREIGN KEY(player_id) REFERENCES players(id)
)`);
db.run(sql3);

const createGame = (leader, maxCards, callback) =>{
    const gameCode  = Math.random().toString(36).substring(2, 6).toUpperCase(); // Generate a unique code
    const sql = (`INSERT INTO gamedetails (code, leader, max_cards) VALUES(?,?,?)`)
    db.run(sql,[gameCode, leader, maxCards],  function(err) {
        if (err) {
            return callback(err, null); // Send error back if something goes wrong
        }
        callback(null, gameCode ); // Send gameCode back only after database insertion is done
    }
);
}
//Drop Table
//db.run('DROP TABLE gamedetails');


// Insert data into table
// sql = `INSERT INTO gamedetails(code, leader, max_cards)VALUES(?,?,?)`;
// db.run(sql,[345,"Josh", 6], (err)=>{
//     if (err) return console.error(err.message);
// });

// Update data
// sql =  `UPDATE gamedetails SET leader = ? where id = ?`;
// db.run(sql,["Zoe", 1], (err)=>{
//     if (err) return console.error(err.message);
// });

// // Delete data
//  sql =  `DELETE FROM gamedetails where id = ?`;
// db.run(sql,[1], (err)=>{
//     if (err) return console.error(err.message);
// });

// Query database
// sql = `SELECT * FROM gamedetails`;
// db.all(sql, [], (err, rows)=>{
//     if (err) return console.error(err.message);
//     rows.forEach(row=>{
//         console.log(row);
//     })
// })

module.exports = {db, createGame};