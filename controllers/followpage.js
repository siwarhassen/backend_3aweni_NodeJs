const Followpage = require('../models/Followpage');
const User = require('../models/User');
const Page = require('../models/Page');

exports.add = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    new Followpage({ UserId:user._id,PageId:req.params.id }).save();
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

exports.getFollowers = async (req, res, next) => {
    Followpage.find({UserId: req.params.iduser},(err, data) => {
            if (!err) { 
                res.send(data); 
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getMyFollowers = async (req, res, next) => {
    Followpage.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.getMyFollowers_limit = async (req, res, next) => {
    const followers = await Followpage.find({UserId: req.user.payload._id}).limit(6);
    let f=[];
    for (let j of followers){
        let page = await Page.find({_id: j.PageId})
        console.log(page)
        f.push(page[0]);
    }
    //console.log(f)
    res.json(f)
}

exports.getFollower_user = async (req, res, next) => {
    const followers = await Followpage.find({PageId: req.params.id}).limit(6);
    let f=[];
    for (let j of followers){
        let user = await User.find({_id: j.UserId})
        //console.log(user)
        f.push(user[0]);
    }
   // console.log(f)
    res.json(f)
}

exports.deleteFollower = async (req, res, next) => {
        Followpage.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    
}
exports.numberFollowers = async (req, res, next) => {
   Followpage.find({UserId: req.user.payload._id}).count()
   .then(page => {
       res.status(200).json(page)
    })
   .catch(error => {
       res.status(400).json({ error })
    });;
       
}
exports.number = async (req, res, next) => {
    Followpage.find({PageId: req.params.id}).count()
    .then(user => {
        res.status(200).json(user)
        console.log(user)
     })
    .catch(error => {
        res.status(400).json({ error })
     });;
        
 }

 exports.get = async (req, res, next) => {
    //const followers = await Followpage.find({PageId: req.params.id});
    const pages = await Page.find({UserId: req.user.payload._id});
    let f=[];
    for (let j of pages){
        let followers = await Followpage.find({PageId:j._id}).count()
        //let user = await User.find({_id: j.UserId})
        //console.log(user)
        f.push(followers);
    }
    console.log(f)
    res.json(f)
}
