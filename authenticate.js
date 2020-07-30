let authenticate = (req,res,next) => {
    
    //if session password matches database password?
    if(req.session.password){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = authenticate