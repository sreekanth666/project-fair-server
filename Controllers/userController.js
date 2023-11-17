const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

// User registration
exports.register = async(req, res) => {
    console.log("Inside User Controller Function");
    const {username, email, password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(406).json("Account already exist. Please login")
        } else {
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.error("Registration API failed:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// User login
exports.login = async(req, res) => {
    console.log("Control inside login function");
    const{email, password} = req.body

    try {
        const existingUser = await users.findOne({email, password})
        if (existingUser) {
            const token = jwt.sign({userId: existingUser._id},"superSecretKey123")
            res.status(200).json({
                existingUser,
                token
            })
        } else {
            res.status(404).json("Password or email is incorrect")
        }
    } catch(error) {
        console.log("Internal error");
    }
} 