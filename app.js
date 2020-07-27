const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const port = 4321
const path = require('path')
const userRoutes = require('./routes/login')
const feedRoutes = require('./routes/feed')
const profileRoutes = require('./routes/profile')
const bodyParser = require('body-parser')

const es6Renderer = require('express-es6-template-engine')

app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

const session = require('express-session')

app.use(session({
    secret: 'lajkhsdlfuono97qoh78hO*&N**7no78rexn3onr87gO*&NOCIAHSLUIN(NH#(*NH',
    resave: false,
    saveUninitialized: false
  }))

let authenticate = (req,res,next) => {
    
    //if session password matches database password?
    if(req.session.password){
        next()
    } else {
        res.redirect('/login')
    }
    
}

app.use('/login',userRoutes)
app.use('/feed',authenticate,feedRoutes)
app.use('/profile',authenticate,profileRoutes)
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => res.send('working'))

app.listen(port)