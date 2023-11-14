const users = require('../Models/userSchema')

exports.register = async(req, res) => {
    console.log("Inside User Controller Function");
    const {username, email, password} = req.body

    // console.log(`${username}, ${email}, ${password}`);
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


exports.login = async(req, res) => {
    console.log("Control inside login function");
    const{email, password} = req.body

    try {
        const loginUser = await users.find({email, password})
        if (loginUser) {
            res.status(200).json("Login success")
        } else {
            res.status(406).json("Password or username mismatch")
        }
    } catch(error) {
        console.log("Internal error");
    }
} 