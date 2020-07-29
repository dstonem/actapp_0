const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended:true }))

router.get('/',(req,res) => {
    let firstName = req.session.firstName
    res.render('feed',{locals:{firstName}})
})

module.exports = router