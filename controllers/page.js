const Page = require('../models/Page');
const User = require('../models/User');

exports.addPage = async function (req, res, next) {
    const user = await User.findById(req.user.payload._id);
    if(user){
    console.log(req.files.profilePicture[0].originalname)
    console.log(req.files.coverPicture[0].originalname)
   // console.log(req.body)
    new Page({...req.body,profilePicture:req.files.profilePicture[0].originalname,coverPicture:req.files.coverPicture[0].originalname,UserId:user._id }).save();
   
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

exports.updatePage = async (req, res, next) => {
   // const {name,description,type,profilePicture,coverPicture,numTel,country,address} = req.body;
    const page = await Page.findById(req.params.id);
    console.log(req.body)
    console.log(req.files)
    if (page.UserId == req.user.payload._id){
        Page.updateOne({ _id: req.params.id }, { ...req.body})
    .then((Page) => res.status(200).json({ Page}))
    .catch(error => res.status(400).json(error));
      /*  Page.findByIdAndUpdate(req.params.id,
        {...req.body,profilePicture:req.file.profilePicture[0].originalname,coverPicture:req.file.coverPicture[0].originalname},
        function (err, data) {
        if (err)
            return res.status(500).json({msg: err.message})
        res.status(201).json({
            success: true,
            message: data
        });
        })*/
    }
}

exports.getPageDetails = async (req, res, next) => {
    Page.findById(req.params.id, (err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getAllPages = async (req, res, next) => {
    Page.find((err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getPages = async (req, res, next) => {
    Page.find((err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        }).limit(6)};

exports.getMyPages = async (req, res, next) => {
    Page.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.deletePage = async (req, res, next) => {
    const page = await Page.findById(req.params.id);
    if (page.UserId == req.user.payload._id){
        Page.findByIdAndRemove(req.params.id, (err, data) => {
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

exports.getPagesByCategory = async (req,res) => {
    const user = await User.findById(req.user.payload._id)
    if(user){
        Page.find({type: req.params.category}, function (err, data){
            if (!err) { res.send(data); }
            else { 
                return res.status(500).json({msg: err.message})
             }
    });
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
}

exports.getPagesbyName = async (req, res, next) => {
    Page.find({name :  {'$regex': req.params.name,$options:'$i'} })
    .then(page => {res.status(200).json(page);})
    .catch(error => {res.status(400).json({ error });console.log(error)});
};
