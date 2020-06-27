

const express = require('express')

const app = express()


app.listen(3000, () => {
    console.log('server started at (localhost:3000)')
})

const db = require('./database/db')

app.use(express.static("public"))

app.set('view engine', 'ejs')

//allows to retrieve data sent as 'content type', which is the default for values posted from a form.
app.use(express.urlencoded({ extended: false}))

app.get('/', (req,res) => {
    res.render('user-home')
})
app.get('/user-search', (req,res, next) => {

    const searchTitle = req.query.title
    const searchAuthor = req.query.author

    if (searchTitle || searchAuthor){
    const sqlTA = `SELECT * FROM Books WHERE Title LIKE '%${searchTitle}%'
    AND Author LIKE '%${searchAuthor}%'`
    db.all(sqlTA,[], (err,rows) => {
        if(err){
            return console.log(err.message)
        }
        return res.render('user-search',{
            error:false,
            model: rows
        })
    })
    }else{
        res.render('user-search',{
            error:true })
    }
})

app.get('/staff-view', (req,res) =>{
    const sql = `SELECT * FROM Books ORDER BY Title`
    db.all(sql,[], (err, rows) => {
        if(err) {
            console.log(err.message)
        }
        res.render('staff-view',{model: rows})
    })
    
})

app.get('/staff-delete/:id',(req,res) => {
    id = req.params.id
    const sql = `SELECT * FROM Books WHERE Book_ID = ?`
    db.get(sql, id, (err, rows) => {
        if(err){
            console.log(err.message)
        }
        res.render('staff-delete', {model: rows})
    })
})

app.post('/staff-delete/:id', (req,res) => {
    id = req.params.id
    sql = `DELETE FROM Books WHERE Book_ID = ?`
    db.run(sql, id, err => {
        if(err){
            console.log(err.message)
        }
        res.redirect('/staff-view')
    })
})
app.get('/staff-edit/:id', (req, res) => {
    id = req.params.id
    sql = `SELECT * FROM Books WHERE Book_ID = ?`
    db.get(sql, id, (err, rows) => {
        if(err){
            console.log(err.message)
        }
        res.render('staff-edit', {model: rows})
    })
})

app.post('/staff-edit/:id', (req,res) => {
    id = req.params.id
    const book = [
        req.body.Title,
        req.body.Author,
        req.body.Location,
        req.body.Comments,
        id
    ]
    const sql = `UPDATE Books SET
    Title = ?,
    Author = ?,
    Location = ?,
    Comments = ?
    WHERE(Book_ID = ?)`

    db.run(sql, book, err => {
        if(err){
            console.log(err.message)
        }
        res.redirect('/staff-view')
    })
})

app.get('/staff-create', (req,res) => {
    res.render('staff-create', {model:{}})
})

app.post('/staff-create', (req,res) => {
    const sql = `INSERT INTO Books 
    ( Title,
    Author,
    Location,
    Comments )
    VALUES(?, ?, ?, ?)`
    
    const book = [
        req.body.Title,
        req.body.Author,
        req.body.Location,
        req.body.Comments
    ]

    db.run(sql, book, err => {
        if(err){
            console.log(err.message)
        }
        res.redirect('staff-view')
    })
})

