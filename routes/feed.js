const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended:true }))

router.get('/',(req,res) => {
    let firstName = req.session.firstName
    res.render('feed',{locals:{firstName}})
})

router.get('/updateUser', (req, res, next) =>{
    res.render('updateUser')
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

module.exports = router