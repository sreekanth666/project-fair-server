const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]

    // Token verification
    try {
        const jwtResponse = jwt.verify(token, "superSecretKey123")
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(401).json("Authorization failed. Please Login")
    }
}

module.exports = jwtMiddleware