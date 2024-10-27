import {User} from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async(req,res,next)=>{
   try{

    const {fullname, email, phoneNumber,password,role} = req.body;
    if(!fullname || !email || !phoneNumber || !password || !role)
    {
        return res.status(400).json({
            error:"Something is missing ",
            success:false,
        })
    }

 const user = await User.findOne({email})
 if(user)
 {
    return res.status(400).json({
        message:"User Already exist",
        success:false,
    })
 }
     const hashedpass = await bcrypt.hash(password,10)
   
  const newUser = new User({
    fullname,
    email,
    password:hashedpass,
    role,
    phoneNumber,

  })
     await newUser.save()
     res.status(201).json({
        success:true,
        message:"user created successfully",
       
     })
       
   }         
catch(error)
{ 
console.log(error)

   }


}





export const signIn = async(req,res,next)=>{
    try {
        
  const {email, password, role} = req.body;
  if(!email || !password || !role)
  {
      return res.status(400).json({
        success:false,
        message:"Something is missing ",
      })
  }

  const user = await User.findOne({email});

  if(!user)
  {
      return res.status(400).json({
        message:"Incorrect Credentials",
        success:false,
      })
  }
  
  
  const ispasswordMatch =  bcrypt.compare(password , user.password )

  if(!ispasswordMatch)
  {
    return res.status(400).json({
        message:"Incorrect Credentials",
        success:false,
      })
  }
  const {password:hashedpass , ...rest} =user._doc;

  if(role !== user.role)
  {
    return res.status(400).json({
        message:"Account doen't exist with current role",
        success:false,
      })   
  }
  const tokenData = {
   userId: user._id
  }
  const token = jwt.sign(tokenData , process.env.JWT_SECRET, {expiresIn:"2h"})
  
  return res.status(200).cookie("token" , token , {maxAge:1*24*60*60*1000 , httpsOnly:true, sameSite:"strict"}).json({
    message:    `welcome Back ${user.fullname}`,
    success:true,
    data:rest,
  })

    } catch (error) {
         return res.status(400).json({
            success:false,
            message:error
         })
    }
}

export const logout = async(req,res,next)=>{
    try {
         return res.status(200).cookie('token',"",{maxAge:0}).json({
            message:"Logged Out Successfully",
            success:true,
         })
    } catch (error) {
         console.log(error)
    }  
}

export const updateProfile = async (req,res)=>{
    try{
    let {fullname, email , phoneNumber , bio , skills } = req.body;
    
      let skillsArray;
      if(req.skills){
         skillsArray = skills.split(",")
      }
    

     // for authentication 

    const userId= req.id ;

    let user= await User.findById(userId) ;
    if(!user)
    {
          return res.status(400).json({
            message:"User not found ",
            success:false,
          })
    } 
    
    if(fullname)  user.fullname= fullname
     if(email) user.email = email
     if(phoneNumber)user.phoneNumber = phoneNumber
     if(bio)user.profile.bio = bio
     if(skills)user.profile.skills = skillsArray;



     await user.save()
       user  = {
       _id:user._id,
       fullname:user.fullname,
       email:user.email,
       phoneNumber:user.phoneNumber,
       role:user.role,
       profile:user.profile
       }

       return res.status(200).json({
        message:"Profile updated Successfully",
        success:true,
        data:user,
     }
       )
       
    } 
    catch(error)
    {
       console.log(error)  
    }
}