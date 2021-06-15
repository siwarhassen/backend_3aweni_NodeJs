const Cv = require('../models/cv');
const User = require('../models/User');

exports.addCv = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    //const {name} = req.body;
    console.log(req.files.cv[0].originalname)
    const cv=new Cv({ UserId:user._id,cv:req.files.cv[0].originalname });
    cv.save();
    res.status(201).json({
            success: true,
            data: cv
        });
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
}
exports.getMyCvs = async (req, res, next) => {
    Cv.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}
exports.deleteCv = async (req, res, next) => {
    const cv = await Cv.findById(req.params.id);
    
        Cv.findByIdAndRemove(req.params.id, (err, data) => {
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