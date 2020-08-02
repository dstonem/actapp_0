const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db_connection')
const formidable = require('formidable');
const posts = require('../models/post-db-logic')(db,router)

router.use(bodyParser.urlencoded({ extended:true }))

router.get('/',(req,res) => {
    let firstName = req.session.firstName
    res.render('feed',{
        locals:{
            firstName
        },
        partials:{
            headerNav: 'partials/headerNav'
        }
})
})

router.get('/createPost',(req, res, next) =>{
    res.render('createPost')
})

router.post('/createPost', async (req,res,next) => {
    let title = req.body.title
    let body = req.body.body
    let picurl = req.body.picurl
    let tags = req.body.tags

    if(req.session) {
        req.session.title = title
        req.session.body = body
        req.session.picurl = picurl
        req.session.tags = tags
    }

    console.log(req.session.user_id)
    let isValid = await posts.createPost(title, body, picurl, tags, req.session.user_id)
    
    if(isValid){
        res.redirect('/feed')
    } else {
        res.render('createPost',{locals: {message: 'Duplicate post'}})
    }
    
})

module.exports = router