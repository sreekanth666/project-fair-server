const projects = require('../Models/projectSchema')

// Add projects
exports.addProject = (req, res) => {
    console.log("Inside add project function");
    const projectImage = req.file
    const userId = req.payload
    res.status(200).json("addProejcts request recived")

    // TESTS
    console.log(userId);
    console.log(projectImage);
}