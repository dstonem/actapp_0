const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db_connection')
const Post = require('../models/post-db-logic')()

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

router.post('/',async (req,res) => {
    let usersCauses = await Post.selectUsersCauses(req.session.user_id)
    console.log(`usersCauses.cause_one:${usersCauses}`)
    let postsFromCauseOne = await Post.selectAllPostsFromCause(usersCauses.cause_one)
    let postsFromCauseTwo = await Post.selectAllPostsFromCause(usersCauses.cause_two)
    let postsFromCauseThree = await Post.selectAllPostsFromCause(usersCauses.cause_three)

    let postsFromUsersCauses = []
    //how could we do this with .map?
    //PUSHING EACH OF THE POSTS FROM EACH CATEGORY INTO THE postsFromUsersCauses ARRAY
    for(let i = 0; i < postsFromCauseOne.length; i++){
        console.log("made it to here")
        postsFromCauseOne[i].likes = await Post.getPostLikes(postsFromCauseOne[i].id)
        console.log(`made it to ${postsFromCauseOne[i].likes}`)
        postsFromUsersCauses.push(postsFromCauseOne[i])
    }

    for(let i = 0; i < postsFromCauseTwo.length; i++){
        postsFromCauseTwo[i].likes = await Post.getPostLikes(postsFromCauseTwo[i].id)
        postsFromUsersCauses.push(postsFromCauseTwo[i])
    }

    for(let i = 0; i < postsFromCauseThree.length; i++){
        postsFromCauseThree[i].likes = await Post.getPostLikes(postsFromCauseThree[i].id)
        postsFromUsersCauses.push(postsFromCauseThree[i])
    }
    
    // for(let i = 0; i < usersCauses.length; i++){
    //     postsFromCause[i] = await Post.selectAllPostsFromCause(usersCauses[i].value)
    //     console.log(`causesLoaded[i]: ${postsFromCause[i]}`)
    // }
    console.log(`postsFromUsersCauses: ${postsFromUsersCauses}`)
    res.send(postsFromUsersCauses)

})

router.post('/likes',async (req,res) => {
    let getPostLikes = await Post.getPostLikes()
    res.send(getPostLikes)
})

router.post('/addlike',async (req,res) => {
    //XXXXXXX how to get req.body to recognize the post_id, very close
    console.log(req.body)
    let likePost = await Post.likePost(req.session.user_id,req.body)
    res.send(likePost)
})

module.exports = router