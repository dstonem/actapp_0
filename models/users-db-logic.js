const express = require('express')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const db = require('../db_connection')

let User = () => {
    let name
    const register = async (username,password,firstName,lastName,email,streetaddress,city,state,zipcode,cause1,cause2,cause3) => {
        let user = await db.oneOrNone(`SELECT id FROM users WHERE username = '${username}'`)
        if(user){
            console.log(user)
            return false
        } else {
            
            console.log("isValid",user)
            bcrypt.hash(password,SALT_ROUNDS, async function(error,hash){
                if(error == null){
                    name = await db.one('INSERT INTO users (username,password,firstName,lastName,email,streetaddress,city,state,zipcode,cause_one,cause_two,cause_three) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id',[`${username}`,`${hash}`,`${firstName}`,`${lastName}`,`${email}`,`${streetaddress}`,`${city}`,`${state}`,`${zipcode}`,`${cause1}`,`${cause2}`,`${cause3}`])
                    return name
                }
            })
            // console.log(`This person's id is: ${name.id}`)
            return name
        }
    }

    const login = async (username,password) => {
        let user = await db.oneOrNone(`SELECT id FROM users WHERE username = '${username}'`)
        if(user){
            bcrypt.compare(password,user.password,function(error,result){
                if(result){
                    return true
                } else {
                    return false
                }
            })
            return user
        } else {
            return false
        }

        //since it's async it's returning a promise
        return newUser
            //then use the user id for loading that users info
    }

    const storeUsersCauses = async (cause1,cause2,cause3,username) => {
        let causes = await db.one(`UPDATE users SET cause_one = '${cause1}', cause_two = '${cause2}', cause_three = '${cause3}' WHERE username = '${username}' RETURNING *`)
        console.log(causes)
        return causes
    }
        
        return {
            register,
            login,
            storeUsersCauses
        }
    }

module.exports = User