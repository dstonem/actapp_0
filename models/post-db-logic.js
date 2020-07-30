const express = require('express')
const db = require('../db_connection')

let Post = () => {

    const createPost = async (title,body,url,tags) => {
        let post = await db.any(`SELECT id FROM posts WHERE title = '${title}'`)
        console.log(post)
        if(post.length > 0){
            console.log(post)
            return false
        } else {
            if(title != null){
                let newPost = await db.any('INSERT INTO posts (title,body,url,tags) VALUES ($1,$2,$3,$4)',[`${title}`,`${body}`,`${url}`,`${tags}`])
                return newPost
            }
            return true
        }
        
    }
    return {
        createPost
    }
}

module.exports = Post
