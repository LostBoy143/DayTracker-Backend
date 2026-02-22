const ENV = require("./env.js")
const mongoose = require("mongoose")

const mongo = ENV.MONGO_URI
const connectDb = async()=>{
try{
const conn = await mongoose.connect(ENV.MONGO_URI);
console.log(`MongoDB connected: ${conn.connection.host}`)
}
catch(err){
console.error("DB connection failed",err)
process.exit(1)
}
}

module.exports = connectDb