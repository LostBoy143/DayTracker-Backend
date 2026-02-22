const jwt = require("jsonwebtoken")

const ENV = require("../config/env.js")

const generateToken =  (payload)=>{

const options ={
    expiresIn:ENV.JWT_EXPIRES_IN || "7d"
}
return jwt.sign(payload ,ENV.JWT_SECRET , options)


}

module.exports = generateToken