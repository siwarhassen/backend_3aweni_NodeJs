const Category = require('../models/PageCategory');
const User = require('../models/User');

exports.add = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    new Category({ ...req.body }).save();
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

exports.getcategories = async (req, res, next) => {
    Category.find((err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.filterBycategories = async (req, res, next) => {
    Category.find({name : req.params.name })
    .then(course => {res.status(200).json(c);console.log(c)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
}
