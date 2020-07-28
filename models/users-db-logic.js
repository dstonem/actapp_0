const pgp = require('pg-promise')()
const connect = require('../config')
const db = pgp(connect)

let User = () => {

    const insert = async (username,password) => {await db.none(`INSERT INTO users (username,password,firstName,lastName,email)
    VALUES ('${username}','${password}','test','test','test')`)}

    return {
        insert
    }
}

module.exports = User