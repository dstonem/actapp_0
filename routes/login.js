const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db_connection')
const User = require('../models/users-db-logic')(db,router)

router.use(bodyParser.urlencoded({extended:true}))

router.get('/', (req,res,next) => {
    let user = {username:req.session.username,password:req.session.password}
    res.render('login',{locals:{user,message:""}})
})

router.post('/', async (req,res,next) => {
    let username = req.body.username
    let password = req.body.password

    if(req.session) {
        req.session.username = username
        req.session.password = password
    }

    let isValid = await User.login(req.session.username,req.session.password)

    if(isValid){
        res.redirect('/feed')
    } else {
        res.render('login',{locals:{message:"Username and/or password invalid. Try again."}})
    }
})

router.get('/register',(req,res,next) => {
    res.render('register',{locals: {message: ''}})
})

router.post('/register', async (req,res,next) => {
    let username = req.body.username
    let password = req.body.password
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let address = req.body.address
    let city = req.body.city
    let state = req.body.state

    if(req.session) {
        req.session.username = username
        req.session.password = password
        req.session.firstName = firstName
        req.session.lastName = lastName
        req.session.email = email
        req.session.address = address
        req.session.city = city
        req.session.state = state
    }
    
    let isValid = await User.register(req.session.username, req.session.password, req.session.firstName, req.session.lastName, req.session.email, req.session.address, req.session.city, req.session.state)
    
    if(isValid){
        res.redirect('/survey')
    } else {
        res.render('register',{locals: {message: 'Username already exists'}})
    }
    
})

router.get('/survey',(req, res, next) =>{
    res.render('survey')
})

router.post('/survey',(req, res, next) =>{
    res.redirect('/feed')
})

router.get('/updateUser', (req, res, next) =>{
    res.render('updateUser')
})

router.post('/updateUser', (req, res, next) =>{
    let username = req.body.username
    let password = req.body.password
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let address = req.body.address
    let city = req.body.city
    let state = req.body.state
    let userId = req.session.users.id

    db.none('INSERT INTO users(username,password,firstName,lastName,email,address,city,state,userId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$3)', 
    [username, password, firstName, lastName, email, address, city, state, userId])
    .then(() => {
        res.send("SUCCESS")
    })
})

router.get('/deleteUser', (req, res, next) =>{
    res.render('deleteUser')
})

router.get('/feed', (req,res,next) =>{

    let userId = req.session.users.id

    db.any('SELECT title,body,picture FROM posts WHERE userId = $1', [userId])
    .then((posts) =>{
        res.render('feed', {posts: posts})
    })

    
})

module.exports = router