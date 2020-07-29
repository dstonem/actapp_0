const express = require('express')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const db = require('../db_connection')

let User = () => {

    const register = async (username,password,firstName,lastName,email) => {
        let user = await db.oneOrNone(`SELECT id FROM users WHERE username = '${username}'`)
        if(user){
            console.log(user)
            return false
        } else {
            console.log("isValid",user)
            bcrypt.hash(password,SALT_ROUNDS,function(error,hash){
                if(error == null){
                    console.log(username,hash,firstName)
                    let name = db.one('INSERT INTO users (username,password,firstName,lastName,email) VALUES($1,$2,$3,$4,$5) RETURNING firstName',[`${username}`,`${hash}`,`${firstName}`,`${lastName}`,`${email}`])
                    return name
                }
            })
            return true
        }
    }

    const login = async (username,password) => {
        let user = await db.oneOrNone(`SELECT id,username,password FROM users WHERE username = '${username}'`)
        if(user){
            bcrypt.compare(password,user.password,function(error,result){
                if(result){
                    return true
                } else {
                    return false
                }
            })
            return true
        } else {
            return false
        }

        //since it's async it's returning a promise
        return newUser
            //then use the user id for loading that users info
    }
        
        return {
            register,
            login
        }
    }

module.exports = User