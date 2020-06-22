

const express = require('express')

const app = express()


app.listen(3000, () => {
    console.log('server started at (localhost:3000)')
})

const db = require('./database/db')

app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    res.render('home')
})
app.get('/search', (req,res) => {

    const searchTitle = req.query.title
    const searchAuthor = req.query.author

    if (searchTitle){
    const sqlT = `SELECT * FROM Books WHERE Title LIKE '%${searchTitle}%'`
    db.all(sqlT, [], (err,rows) => {
        if(err){
            return console.log(err.message)
        }
        return res.render('search',{model: rows})
    })
    }
    if(searchAuthor){
        const sqlA = `SELECT * FROM Books WHERE Author LIKE '%${searchAuthor}%'`
        db.all(sqlA, [], (err,rows) => {
            res.render('search', {model: rows})
        })
    }
})

