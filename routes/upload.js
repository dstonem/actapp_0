const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const formidable = require('formidable');

router.use(bodyParser.urlencoded({ extended:true }))

router.get('/',(req,res) => {
    res.render('upload')
})

router.post("/", (req,res)=>{

    let form = {};

    //this will take all of the fields (including images) and put the value in the form object above
    new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
        form[name] = field;
      })
    .on('fileBegin', (name, file) => {
        //sets the path to save the image

        //NEXT STEP: try to get this file path working
        file.path = '/Users/dylan/dc_projects/actapp/public/images/' + new Date().getTime() + file.name
    })
    .on('file', (name, file) => {
        //console.log('Uploaded file', name, file);
        form.profile_image = file.path.replace(__dirname+'/public',"");
    })
    .on('end', ()=>{
        console.log(form);
        //Now i can save the form to the database
        //db.createItem(form)//not exact code here
        //.then(result=>res.send(result))
        res.redirect('/feed')
        
    })
    
})

module.exports = router