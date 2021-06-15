const Skill = require('../models/Skill');
const User = require('../models/User');

exports.addSkill = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    const {name,visible,valid} = req.body;
    new Skill({ UserId:user._id,name,visible,valid }).save();
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

exports.updateSkill = async (req, res, next) => {
    const {name,visible,valid} = req.body;
    const skill = await Skill.findById(req.params.id);
    if (skill.UserId == req.user.payload._id){
        Skill.findByIdAndUpdate(req.params.id,
        req.body,
        function (err, data) {
        if (err)
            return res.status(500).json({msg: err.message})
        res.status(201).json({
            success: true,
            message: data
        });
        })
    }
}

exports.getSkillDetails = async (req, res, next) => {
    Skill.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getSkills = async (req, res, next) => {
    Skill.find({UserId: req.params.iduser},(err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getMySkills = async (req, res, next) => {
    Skill.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.deleteSkill = async (req, res, next) => {
    const skill = await Skill.findById(req.params.id);
    if (skill.UserId == req.user.payload._id){
        Skill.findByIdAndRemove(req.params.id, (err, data) => {
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