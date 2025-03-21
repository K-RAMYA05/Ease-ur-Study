const path = require('path');
const hbs = require('hbs');
const express = require('express');
const sgMail = require('@sendgrid/mail')
require('./db/mongoose');
const User = require('./models/user');
const req_otp= require("./emails/account")
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const { localsAsTemplateData } = require('hbs');
const bodyParser = require("body-parser");
var multer=require("multer")


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
app.get("/", (req, res) => {
    res.render('index');
  });
app.get('/login',(req,res)=>{
    res.render('index',{
        msg: req.query.msg
    })
})


var temp_user,rand,host

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
          
        res.redirect('/EaseYourStudy') //token).status(200).redirect('/EaseYourStudy')
        
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
    temp_user=userData
    rand=Math.floor((Math.random() * 100) + 54)
    
    
    link="https://ease-your-study.herokuapp.com/verify?id="+rand

    const sendgridAPIkey = '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'

    sgMail.setApiKey(sendgridAPIkey)

    await sgMail.send({
        to: temp_user.email,
        from: 'kramya.rk01@gmail.com',
        subject: 'Verify your email for EaseYourStudy',
        html:"Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    })
    res.render('verify_mail')
    
})

app.get('/verify',async(req,res)=>{
    console.log("Hello")
    try{
        // if((req.protocol+"://"+req.get('host'))==("http://"+host)){
            if(req.query.id==rand){
                const user =  new User(temp_user)
                if(!user){
                    return  res.status(400).send("Invalid data")
                }
                await user.save()
                const token = await user.generateAuthToken();
                res.cookie('access_token',token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                })
                res.redirect('/EaseYourStudy')
            }
        // }
        
        
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
        email:req.user.email,
        img:req.user.img,
        department:req.user.deptartment,
        username:req.user.username,
        gender:req.user.gender,
        age:req.user.age,
        college:req.user.college,
        msg:req.query.msg
    })
})
app.post('/EaseYourStudy/profile',auth,async(req,res)=>{
     try{
         const userid = req.user._id
         
         const doc= await User.findOneAndUpdate({_id:userid},{
             $set:{
                 username:req.body.username,
                 department:req.body.department,
                 img:req.body.img,
                 age:req.body.age,
                 gender:req.body.gender,
                 college:req.body.college,
                 img:req.body.img,
                 email:req.body.email
             }
         })
         if(doc){
             
             res.redirect('/EaseYourStudy/profile?msg=Your profile has been updated successfully!')
         }
     }catch(e){
         res.redirect('/EaseYourStudy/profile?msg=Failed to update your profile!')
     }
})
app.post('/EaseYourStudy/reviews',auth,async function(req,res) {
    const user_id = req.user._id
    try{
        const user= await User.findById(user_id)
        for(let i=0;i<req.body.length;i++){
            let review= req.body[i]
            user.reviews = user.reviews.concat({review})
        }
        await user.save()
        const sendgridAPIkey = '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'

        sgMail.setApiKey(sendgridAPIkey)

        await sgMail.send({
            to: user.email,
            from: 'ak656634@gmail.com',
            subject: 'EaseYourStudy- Your reviews got submitted',
            html:"<h2>Thank you for your reviews</h2><br><h3>It will help us in improving and serving better.</h3>"
        })
        if(doc){
             
            res.redirect('/EaseYourStudy/reviews?msg=Your reviews has been sent successfully!')
        }
    }catch(e){
       res.send("Error in saving your reviews",e)
    }
   
    
  });

  app.post('/EaseYourStudy/queries',auth,async (req,res)=>{
    const user_id = req.user._id
    
    const subject = req.body.subject
    const query = req.body.query
    try{
        const user= await User.findById(user_id)
        user.queries = user.queries.concat({subject,query})
        await user.save()
        const sendgridAPIkey = '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'

        sgMail.setApiKey(sendgridAPIkey)

        await sgMail.send({
            to: user.email,
            from: 'ak656634@gmail.com',
            subject: 'EaseYourStudy- Subject related queries',
            html:"<h3>We have recieved your queries. Your queries will be answered shortly. Till then continue learning.</h3>"
        })
    }catch(e){
       res.send("Error in saving your queries",e)
    }
    if(doc){
             
        res.redirect('/EaseYourStudy/queries?msg=Your queries has been sent successfully!')
    }
} )

app.get('/reset_password',(req,res)=>{
    res.render('forgot_pass')
})
var temp_otp;
app.get('/req_OTP',async (req,res)=>{
    temp_otp= Math.floor(100000 + Math.random() * 900000)
    await req_otp(req.query.mail,temp_otp)
})
app.post('/reset_password',async(req,res)=>{
    
})
app.listen(port,()=>{
    console.log("Server is running")
})