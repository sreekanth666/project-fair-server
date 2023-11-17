const projects = require('../Models/projectSchema')

// Add projects
exports.addProject = (req, res) => {
    console.log("Inside add project function");
    const userId = req.payload
    console.log(userId);
    res.status(200).json("addProejcts request recived")
}