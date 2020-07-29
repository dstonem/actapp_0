const express = require('express')
const app = express()
const {secret} = require('./config')
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
    secret: secret,
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
app.get('/css/main.css', (req, res)=>res.sendFile(path.join(__dirname, '/css/main.css')))

app.get('/',(req,res) => res.send('working'))

app.listen(port, ()=>{
    console.log(`Listening on port http://localhost:${port}`)
})