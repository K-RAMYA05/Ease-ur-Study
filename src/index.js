const path = require('path');
const hbs = require('hbs');
const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT||3000;

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(publicPath))

app.get('/login',(req,res)=>{
    res.render('index',{
        msg: req.query.msg
    })
})
app.post('/login',async (req,res)=>{
    
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        
        if(!user){
            return res.redirect('/login?msg= Invalid email or password!')
        }
        const token = await user.generateAuthToken()
        
        res.cookie('access_token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          
        res.redirect(302,'/EaseYourStudy') //token).status(200).redirect('/EaseYourStudy')
        
    }catch(e){
        res.status(404).send(e)
    }
  
})

app.get('/logout',auth,async (req,res)=>{
   try{

       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token
       })
       await req.user.save()
       res.clearCookie('access_token')
       res.render('logout')
   }catch(e){
       res.status(500).send()
   }
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.post('/signup',async (req,res)=>{
    const userData = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    
    try{
      
       const user =  new User(userData)
       if(!user){
            return  res.status(400).send("Invalid data")
       }
       await user.save()
       const token = await user.generateAuthToken();
       res.cookie('access_token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
       res.redirect(201,'/EaseYourStudy')
       
    }catch(e){
        res.status(500).send("Can't handle")
    }
})


app.get('/EaseYourStudy',auth,(req,res)=>{
    res.render('home',{
        name: req.user.name,
        email: req.user.email
    })
})
app.get('/EaseYourStudy/video_page',auth,(req,res)=>{
    res.render('video_page',{
        name:req.user.name,
        email: req.user.email
    })
})

app.get('/EaseYourStudy/reviews',auth,(req,res)=>{
    res.render('reviews',{
        name:req.user.name,
        email:req.user.email
    })
})

app.get('/EaseYourStudy/About_us',auth,(req,res)=>{
    res.render('about_us',{
        name:req.user.name,
        email:req.user.email
    })
})
app.get('/EaseYourStudy/profile',auth,(req,res)=>{
    res.render('profile',{
        name:req.user.name,
        email:req.user.email
    })
})

app.listen(port,()=>{
    console.log("Server is running")
})