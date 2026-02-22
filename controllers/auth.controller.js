const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const generateToken = require("../utils/jwt.js")
const registerUser =async (req,res)=>{
try{

// input validation
if(!req.body.name || !req.body.email || !req.body.password){
    return res.status(400).json({
        success:false,
        message:"Incomplete data to register"
    })
}
const {name,email,password} = req.body;

// checking if user already exists ?
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "User already exists"
  });
}

// Creating hashed password
const hashedPassword = await bcrypt.hash(password,10)

// registering to db
const user = await User.create({
    name,
    email,
    password: hashedPassword
})
const payload = {
    userId : user._id.toString(),
    email :user.email
}
const token = generateToken(payload);

return res.status(201).json({
    success:true,
    message:"User created successfully",
    data:{userId:user._id,name:user.name,token:token}
})

}
catch(err){
    console.error(err)
    return res.status(500).json({
        success:false,
        message:"Unable to register user"
    })
}


}


const loginUser = async(req,res)=>{
try{
// input validation 
if(!req.body.email || !req.body.password){
    return res.status(400).json({
        success:false,
        message:"Invalid request"
    })
}

// extracting user password from db
const {email,password} = req.body
const user = await User.findOne({email}).select("+password");
if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"
    })
}

// comparing incoming password to stored one
const match = await bcrypt.compare(password,user.password)
if(!match){
    return res.status(401).json({
        success:false,
        message:"Incorrect password"
    })
}

// generating jwt token 
const payload = {userId:user._id.toString(),email:user.email}
const token = generateToken(payload)

res.status(200).json({
    success:true,
    message:"User logged in successfully",
    data : {userId : user._id , token :token}
})
}
catch(error){
    console.error("login error: ",error);
    return res.status(500).json({
        success:false,
        message:"Login Error"
    })
    
}
}


module.exports = {registerUser , loginUser}