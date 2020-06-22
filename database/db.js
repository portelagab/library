const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database/DataBase.db", err => {
    if (err) {
        console.log(err.message)
    }
    console.log("DataBase conected")
})
module.exports = db

// const sql_create = `CREATE TABLE IF NOT EXISTS Books( Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
//     Title VARCHAR (100) NOT NULL,
//     Author VARCHAR(100) NOT NULL,
//     Location TEXT,
//     Comments TEXT
//     );`

// db.run(sql_create, err => {
//     if(err) {
//         console.log(err.message)
//     }
//     console.log("Conected to table 'Books'")
// })

// const sql_insert = `INSERT INTO Books (Title, Author, Location,Comments) VALUES
// ('Walden', 'H. D. Thoreau', 'Sector C12', 'Great sociology book'),
// ('Hagakure', 'Yamamoto Tsunemoto', 'Sector F5','A perspective from the Samurai way of living'),
// ('Sadhana', 'Sai Baba', 'Sector B10','Spiritual discipline for a better life');`

// db.run(sql_insert, err => {
//     if (err){
//         console.log(err.message)
//     }
//     console.log("Books inserted")
// })

// const deleteAll = 'DELETE FROM Books'
// db.run(deleteAll, err => {
//     if(err){
//         console.log(err.message)
//     }
//     console.log('Rows deleted')
// })

// db.all('SELECT * FROM Books', (err, row) => {
//     if(err) {
//         console.log(err.message)
//     }
//     console.log(row)

// } )
