const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const connect = require('../config')
const db = pgp(connect)
const User = require('../models/users-db-logic')
//how can we have all of the pgp/database/config things in the app.js file? ask Clint...


router.use(bodyParser.urlencoded({extended:true}))

router.get('/',(req,res,next) => {
    let user = {username:req.session.username,password:req.session.password}
    res.render('users',user)
})

router.post('/',(req,res,next) => {
    let username = req.session.username
    let password = req.session.password

    if(req.session) {
        req.session.username = username
        req.session.password = password
    }
    
    console.log(username)
    console.log(password)
    
    // res.send('INSERT INTO...')
})

router.get('/register',(req,res,next) => {
    res.render('register')
})

router.post('/register',(req,res,next) => {
    let username = req.body.username
    let password = req.body.password

    if(req.session) {
        req.session.username = username
        req.session.password = password
    }

    console.log(req.session.username)
    console.log(req.session.password)

    db.none(`INSERT INTO users (username,password,firstName,lastName,email)
    VALUES ('${req.session.username}','${req.session.password}','test','test','test')`)
    // User.insert(req.session.username,req.session.password)
    res.redirect('/')
    // res.send('INSERT INTO...')
})

module.exports = router