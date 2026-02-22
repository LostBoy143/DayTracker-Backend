const express = require("express")
const {registerUser,loginUser} = require("../controllers/auth.controller")



const router = express.Router();

// route to register a new user
router.post("/register",registerUser)

// route to log in
router.post("/login",loginUser)


module.exports = router