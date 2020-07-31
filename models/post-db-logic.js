const express = require('express')
const db = require('../db_connection')

let Post = () => {

    const createPost = async (picurl,body,tags,user_id) => {
            console.log(`Posting pic src: ${picurl}`)
            console.log(`WHO'S POSTING THIS: ${user_id}`)
            let newPost = await db.one('INSERT INTO posts (picurl,body,tags,user_id) VALUES ($1,$2,$3,$4) RETURNING *',[`${picurl}`,`${body}`,`${tags}`,`${user_id}`])
            console.log(newPost)
            return newPost
        }

    const selectAllPostsFromCategory = async (tags) => {
        let postsInCategory = await db.one(`SELECT * FROM posts WHERE tags = '${tags}'`)
        return postsInCategory
    }

    const selectAllFromUser = async (user_id) => {
        let usersPosts = await db.any(`SELECT * FROM posts WHERE user_id = '${user_id}'`)
        return usersPosts
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
        selectAllPostsFromCategory,
        selectAllFromUser
        // searchPost
    }
    
}

module.exports = Post
