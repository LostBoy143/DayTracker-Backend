const express = require("express");
const cors = require("cors")
const ENV = require("./config/env.js")
const connectDb = require("./config/db.js")
const authRouter = require("./routes/auth.routes")
const attendanceRouter = require("./routes/attendance.routes")
const taskRouter = require("./routes/task.routes.js")
const authMiddleware = require("./middleware/auth.middleware.js")

const PORT = ENV.PORT;
console.log("port",PORT)
// Creating an app instance
const app = express();

// setting up cors

const allowedDomains = [
  "http://localhost:5173",
  "https://day-trackr-six.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser clients (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedDomains.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));


// Using middleware to parse json data
app.use(express.json())

// registering auth routes

app.use("/api/auth",authRouter)

// registering attendance routes

app.use("/api/attendance",authMiddleware , attendanceRouter)


// registering task routes

app.use("/api/task",authMiddleware , taskRouter)



// BootStrapping the server

const startServer = async()=>{
try{
await connectDb();

app.listen(PORT,()=>{
   console.log(`Server started at Port : ${PORT}`)
})}
catch(error){
    console.error("Server Startup Failed")
}
}
startServer();

