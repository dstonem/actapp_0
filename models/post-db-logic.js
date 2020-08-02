const express = require('express')
const db = require('../db_connection')

let Post = () => {

    const createPost = async (picurl,body,causes,user_id,username) => {
            console.log(`Posting pic src: ${picurl}`)
            console.log(`WHO'S POSTING THIS: ${user_id}`)
            let newPost = await db.one('INSERT INTO posts (picurl,body,causes,user_id,username) VALUES ($1,$2,$3,$4,$5) RETURNING *',[`${picurl}`,`${body}`,`${causes}`,`${user_id}`,`${username}`])
            console.log(newPost)
            return newPost
        }

    const selectAllPostsFromCause = async (usersCauses) => {
        let postsInCause = await db.any(`SELECT * FROM posts WHERE causes LIKE '${usersCauses}'`)
        return postsInCause
    }

    const selectAllFromUser = async (user_id) => {
        let usersPosts = await db.any(`SELECT * FROM posts WHERE user_id = '${user_id}'`)
        return usersPosts
    }

    const selectUsersCauses = async (user_id) => {
        let usersCauses = await db.one(`SELECT cause_one, cause_two, cause_three FROM users WHERE id = '${user_id}'`)
        console.log(usersCauses)
        return usersCauses
    }

    const getPostLikes = async (post_id) => {
        let likes = await db.one(`SELECT count(*) FROM likes WHERE post_id = '${post_id}'`)
        return Number(likes.count)
    }

    const likePost = async (user_id,post_id) => {
        let likes = await db.none(`INSERT INTO likes (user_id,post_id) VALUES ($1,$2)`,[`${user_id}`,`${post_id}`])
        return likes
    }
    
    // const searchPost = async () => {
    //     let post = await db.none(`SELECT id FROM posts WHERE picurl = '${picurl}'`)
    //     console.log(`The post info is: ${post}`)
    //     if(post.length > 0){
    //         console.log(post)
    //         return false
    //     } else {
    //         if(picurl != null){
    //             return false
    //         }
    //     return true
    // }
// }


    return {
        createPost,
        selectAllFromUser,
        selectAllPostsFromCause,
        selectUsersCauses,
        getPostLikes,
        likePost
        // searchPost
    }
    
}

module.exports = Post
