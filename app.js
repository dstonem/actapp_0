const express = require('express')
const app = express()
// const pgp = require('pg-promise')()
const port = 5444
const path = require('path')
const bodyParser = require('body-parser')

const es6Renderer = require('express-es6-template-engine')

app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

// const session = require('express-session')

// app.use(session({
//     secret: 'lajkhsdlfuono97qoh78hO*&N**7no78rexn3onr87gO*&NOCIAHSLUIN(NH#(*NH',
//     resave: false,
//     saveUninitialized: false
//   }))

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => res.send('working'))

app.listen(port)