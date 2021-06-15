const Quiz = require('../models/Quiz');
const User = require('../models/User');

exports.add = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user.role == 1){
    const {name,skillname,questions} = req.body;
    new Quiz({ UserId:user._id,name,skillname,questions:questions }).save();
    res.status(201).json({
            success: true,
            message: "added"
        });
    }else{
        res.status(400).json({
            sucess: false,
            data: "Not admin"
        });
    }
}

exports.update = async (req, res, next) => {
    const {name,skillname,questions} = req.body;
    const user = await User.findById(req.user.payload._id);
    if (user.role == 1){
        Quiz.findByIdAndUpdate(req.params.id,
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
    if(req.user.payload.role == 1){
    Quiz.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
    }
}

exports.getAll = async (req, res, next) => {
    if(req.user.payload.role == 1){
    Quiz.find((err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
    }
}

exports.getByName = async (req, res, next) => {
    if(req.user.payload.role == 1){
    Quiz.find({skillname: req.params.name},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}
}

exports.deleteQuiz = async (req, res, next) => {
    if(req.user.payload.role == 1){
        Quiz.findByIdAndRemove(req.params.id, (err, data) => {
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