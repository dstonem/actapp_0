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
            headerNav: 'partials/headerNav',
            firstName: 'partials/firstName'
        }
    })
})

router.post('/',async (req,res) => {
    let isLoaded = await Post.selectAllFromUser(req.session.user_id)
    res.send(isLoaded)
})

// router.post('/post',async(req,res) => {
//     console.log(req.body)
//     let postInfo = await Post.selectIndividualPost(req.body.id)
//     let comments = await Post.getPostComments(req.body.id)
//     let likes = await Post.getPostLikes(req.body.id)
//     console.log(postInfo)
//     res.render('post',{locals:{
//         img_url:postInfo.img_url,
//         body:postInfo.body,
//         comments:{
//             body:comments.body,
//             user:comments.username
//         },
//         numLikes:likes
//     }})
// })


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