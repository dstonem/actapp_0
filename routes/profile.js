const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Post = require('../models/post-db-logic')()

router.use(bodyParser.urlencoded({ extended:true }))

router.get('/',async (req,res) => {
    // let isLoaded = await Post.selectAllFromUser(req.session.user_id)
    // res.send(isLoaded)
    res.render('profile',{
        partials:{
            footerNav: 'partials/footerNav'
        }
    })
})

router.post('/',async (req,res) => {
    let isLoaded = await Post.selectAllFromUser(req.session.user_id)
    res.send(isLoaded)
})


router.get('/updateUser', (req, res, next) =>{
    res.render('updateUser',{
        locals:{
            user:req.session
        }
    })
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