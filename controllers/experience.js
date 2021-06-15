const Experience = require('../models/Experience');
const User = require('../models/User');

exports.addExperience = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    const {title,employementType,company,location,description,startDate,endDate,media} = req.body;
    new Experience({ UserId:user._id,title,employementType,company,location,description,startDate,endDate,media }).save();
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

exports.updateExperience = async (req, res, next) => {
    const {title,employementType,company,location,description,startDate,endDate,media} = req.body;
    const experience = await Experience.findById(req.params.id);
    
        Experience.updateOne({ _id: req.params.id }, { ...req.body})
        .then((e) => res.status(200).json({e}))
        .catch(error => res.status(400).json(error));
    
}

exports.getExperienceDetails = async (req, res, next) => {
    Experience.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getExperiences = async (req, res, next) => {
    Experience.find({UserId: req.params.iduser},(err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getMyExperiences = async (req, res, next) => {
    Experience.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.deleteExperience = async (req, res, next) => {
    const experience = await Experience.findById(req.params.id);
    if (experience.UserId == req.user.payload._id){
        Experience.findByIdAndRemove(req.params.id, (err, data) => {
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