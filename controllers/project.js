const Project = require('../models/Project');
const User = require('../models/User');

exports.addProject = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    const {name,description,startDate,endDate,urlProject,media} = req.body;
    new Project({ UserId:user._id,name,description,startDate,endDate,urlProject,media }).save();
    res.status(201).json({
            success: true,
            message: "added"
        });
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
}

exports.updateProject = async (req, res, next) => {
    const {name,description,startDate,endDate,urlProject,media} = req.body;
    const project = await Project.findById(req.params.id);
   
        Project.updateOne({ _id: req.params.id }, { ...req.body})
        .then((p) => res.status(200).json({p}))
        .catch(error => res.status(400).json(error));
    
}

exports.getProjectDetails = async (req, res, next) => {
    Project.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getProjects = async (req, res, next) => {
    Project.find({UserId: req.params.iduser},(err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getMyProjects = async (req, res, next) => {
    Project.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.deleteProject = async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if (project.UserId == req.user.payload._id){
        Project.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) { 
                res.status(201).json({
                    success: true,
                    message: "deleted"
                }); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
    }
}