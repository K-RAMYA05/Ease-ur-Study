const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')



  
const userSchema = new mongoose.Schema(
    {
        name:{
             type: String,
             required:true,
             trim:true
        },
        username:{
            type:String,
            trim:true
        },
        gender:{
            type:String,
            trim:true,
        },
        department:{
            type:String,
            trim:true
        },
        college:{
            type:String,
            trim:true,
        },
        age:{
            type:Number,
            trim:true
        },
        email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid Email!!')
                }
            }
        },
        password:{
            type:String,
            required:true,
            
        },
        
        tokens: [{
            token:{
                type:String,
                required:true
            }
        }],
        reviews: [{
            review:{
                type:String
            }
        }],
        queries: [{
            subject:{
                type:String
            },
            query:{
                type:String
            }
        }]
    
    }
)

userSchema.methods.generateAuthToken= async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'myhppavilion')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    try{

        const user = await User.findOne({email})
        
        if(!user){
            throw new Error('Unable to login')
        }
    
        const isMatch = await bcrypt.compare(password,user.password)
    
        if(!isMatch){
            throw new Error('Unable to login')
        }
        return user
    }catch(e){
        return null
    }

    
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)


module.exports = User
