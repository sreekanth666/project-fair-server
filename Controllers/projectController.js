const projects = require('../Models/projectSchema')

// Add projects
exports.addProject = async(req, res) => {
    console.log("Inside add project function");
    const projectImage = req.file?.filename
    console.log(projectImage);
    const userId = req.payload
    console.log(userId);
    const {title, languages, overview, github, website} = req.body
    console.log(req.body);
    try {
        const existingProject = await projects.findOne({github})
        console.log(existingProject);
        if (existingProject) {
            console.log("Project");
            return res.status(406).json("Project already exists. Upload another")
        } else {
            const newProject = new projects({
                title, languages, overview, github, website, projectImage, userId
            })
            await newProject.save()
            return res.status(200).json(newProject)
        }
    } catch (error) {
        return res.status(401).json(`Request failed`)
    }

}

exports.userProject = async (req, res) => {
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        const projectDetails = await projects.find()
        res.status(200).json(projectDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getHomeProject = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}