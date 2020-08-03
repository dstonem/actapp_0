const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db_connection')
const Post = require('../models/post-db-logic')()

router.use(bodyParser.urlencoded({ extended:true }))
router.use(bodyParser.json())

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

router.post('/addlike', async (req,res) => {
    //XXXXXXX how to get req.body to recognize the post_id, very close
    console.log(req.body)
    //the DB query goes through when i put an integer in for the second argument below...
    let likePost = await Post.likePost(req.session.user_id,1)
    res.send(likePost)
})
//NEXT STEPS: get this to display the comments in the commentDiv in img-to-feed
router.post('/getcomments',async (req,res) => {
    console.log('made it to getcomments')
    //XXXXX need to change the integer below to whatever works for req.body
    let getPostComments = await Post.getPostComments(1)
    console.log(`getPostComments: ${getPostComments}`)
    res.send(getPostComments)
})

router.post('/addcomment', async (req,res) => {
    //XXXXXXX need to change the integer below to whatever works from req.body
    //but the comments are getting stored in the database successfully, just need to get req.body passed successfully
    let addComment = await Post.addCommentToPost('req.body.comment', 1, req.session.user_id, req.session.username)
    console.log(addComment)
    return addComment
})

module.exports = router