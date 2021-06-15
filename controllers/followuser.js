const Followuser = require('../models/Followuser');
const User = require('../models/User');

exports.add = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
        const follow=new Followuser({ UserId:req.user.payload._id,FollowerId:req.params.id }).save();
    res.status(201).json({
            success: true,
            message: follow
        });
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
}

exports.getFollowerss = async (req, res, next) => {
    Followuser.find({FollowerId: req.params.iduser},(err, data) => {
            if (!err) { 
                res.send(data); 
                console.log(data);
            }
            else 
                return res.status(500).json({msg: err.message})
        });
}

exports.getFollowers = async (req, res, next) => {
    const followers = await Followuser.find({UserId: req.params.iduser}).limit(6);
    let f=[];
    for (let j of followers){
        let user = await User.find({_id: j.FollowerId})
        //console.log(user)
        f.push(user[0]);
    }
   // console.log(f)
    res.json(f)
}

exports.getFollower_user = async (req, res, next) => {
    const followers = await Followuser.find({UserId: req.params.id}).limit(6);
    let f=[];
    for (let j of followers){
        let user = await User.find({_id: j.FollowerId})
        //console.log(user)
        f.push(user[0]);
    }
   // console.log(f)
    res.json(f)
}

exports.getMyFollowers = async (req, res, next) => {
    Followuser.find({UserId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.getMyFollowers_limit = async (req, res, next) => {
    const followers = await Followuser.find({UserId: req.user.payload._id}).limit(6);
    let f=[];
    for (let j of followers){
        let user = await User.find({_id: j.FollowerId})
        //console.log(user)
        f.push(user[0]);
    }
    //console.log(f)
    res.json(f)
}

exports.getMyFollowers1 = async (req, res, next) => {
    const followers = await Followuser.find({UserId: req.user.payload._id});
    let f=[];
    for (let j of followers){
        let user = await User.find({_id: j.FollowerId})
        //console.log(user)
        f.push(user[0]);
    }
    //console.log(f)
    res.json(f)
}

exports.deleteFollower = async (req, res, next) => {
  //  const follow = await Followuser.findById(req.params.id);

  Followuser.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  
}
exports.numberFollowers = async (req, res, next) => {
    Followuser.find({UserId: req.user.payload._id}).count()
    .then(user => {
        res.status(200).json(user)
     })
    .catch(error => {
        res.status(400).json({ error })
     });;
        
 }
 exports.numberF = async (req, res, next) => {
    Followuser.find({FollowerId: req.user.payload._id}).count()
    .then(user => {
        res.status(200).json(user)
     })
    .catch(error => {
        res.status(400).json({ error })
     });;
        
 }
 exports.number = async (req, res, next) => {
    Followuser.find({UserId: req.params.id}).count()
    .then(user => {
        res.status(200).json(user)
     })
    .catch(error => {
        res.status(400).json({ error })
     });;
        
 }
 exports.numberFU = async (req, res, next) => {
    Followuser.find({FollowerId: req.params.id}).count()
    .then(user => {
        res.status(200).json(user)
     })
    .catch(error => {
        res.status(400).json({ error })
     });;
        
 }