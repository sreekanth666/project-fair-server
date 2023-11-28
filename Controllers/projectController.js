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

// Get all project (Token required)
exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search
    const query = {
        languages : {
            $regex : searchKey,
            $options : "i"
        }
    }
    console.log(query);
    try {
        const projectDetails = await projects.find(query)
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

exports.editProjectController = async (req, res) => {
    const {id} = req.params
    const userId = req.payload
    const {title, languages, overview, github, website, projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id}, {
            title, languages, overview, github, website, projectImage:uploadProjectImage, userId
        }, {new: true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteProjectController = async(req, res) => {
    const {id} = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({_id: id})
        res.status(200).json(removeProject)
    } catch (error) {
        res.status(401).json(`Error: ${error}`)
    }
}