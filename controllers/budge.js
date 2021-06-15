const Budge = require('../models/budge');
const User = require('../models/User');

exports.add = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    const {skillname,score} = req.body;
    new Budge({ UserId:user._id,skillname,score }).save();
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

exports.update = async (req, res, next) => {
    const {skillname,score} = req.body;
    const budge = await Budge.findById(req.params.id);
    if (budge.UserId == req.user.payload._id){
        Budge.findByIdAndUpdate(req.params.id,
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

exports.getDetails = async (req, res, next) => {
    Budge.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getAll = async (req, res, next) => {
    Budge.find((err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getMyBudges = async (req, res, next) => {
    Budge.find({UserId: req.params.iduser},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.deleteBudge = async (req, res, next) => {
    const budge = await Budge.findById(req.params.id);
    if (budge.UserId == req.user.payload._id || req.user.payload.role == 1){
        Budge.findByIdAndRemove(req.params.id, (err, data) => {
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