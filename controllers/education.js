const Education = require('../models/Education');
const User = require('../models/User');

exports.addEducation = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    const {school,fieldStudy,description,startYear,endYear,media} = req.body;
    const education=new Education({ UserId:user._id,school,fieldStudy,description,startYear,endYear,media });
    education.save();
    res.status(201).json({
            success: true,
            data: education
        });
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
}

exports.updateEducation = async (req, res, next) => {
    const {school,fieldStudy,description,startYear,endYear,media,visible} = req.body;
    const education = await Education.findById(req.params.id);
    
        Education.updateOne({ _id: req.params.id }, { ...req.body})
        .then((e) => res.status(200).json({e}))
        .catch(error => res.status(400).json(error));
    
}

exports.getEducationDetails = async (req, res, next) => {
        Education.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getEducations = async (req, res, next) => {
        Education.find({UserId: req.params.iduser},(err, data) => {
            if (!err) { 
                res.send(data); 
                console.log(data)
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getMyEducations = async (req, res, next) => {
    Education.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data);   
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.deleteEducation = async (req, res, next) => {
    const education = await Education.findById(req.params.id);
    if (education.UserId == req.user.payload._id){
        Education.findByIdAndRemove(req.params.id, (err, data) => {
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