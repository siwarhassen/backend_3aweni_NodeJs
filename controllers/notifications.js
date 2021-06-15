const Notif = require('../models/notification');
const User = require('../models/User');

exports.add = async (req, res, next) => {
    const user = await User.findById(req.user.payload._id);
    if(user){
    const notif=new Notif({ ...req.body,SenderId:user._id,ReceiverId:req.params.id }).save();
    res.status(201).json({
            success: true,
            data: notif
        });
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
}

exports.getNotifs = async (req, res, next) => {
    Notif.find({ReceiverId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
}

exports.getAllMyNotifs = async (req, res, next) => {
  /*  Notif.find({ReceiverId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    }).limit(6);*/
    const notifs = await Notif.find({ReceiverId: req.user.payload._id});
    let f=[];
    for (let j of notifs){
        let user = await User.find({_id: j.SenderId})
        //console.log(user)
        f.push(user[0]);
    }
    //console.log(f)
    res.json(f)
}

exports.getMyNotifs = async (req, res, next) => {
    const notifs = await Notif.find({ReceiverId: req.user.payload._id}).limit(4);
    let f=[];
    for (let j of notifs){
        let user = await User.find({_id: j.SenderId})
        //console.log(user)
        f.push(user[0]);
    }
    //console.log(f)
    res.json(f)
}

exports.getMyNotifs1 = async (req, res, next) => {
    const notifs = await Notif.find({SenderId: req.user.payload._id});
    let f=[];
    for (let j of notifs){
        let user = await User.find({_id: j.ReceiverId})
        //console.log(user)
        f.push(user[0]);
    }
    //console.log(f)
    res.json(f)
}

exports.getMyNotifs2 = async (req, res, next) => {
    Notif.find({ReceiverId: req.user.payload._id},(err, data) => {
        if (!err) { 
            res.send(data); 
        }
        else 
            return res.status(500).json({msg: err.message})
    });
    
}

exports.deleteNotif = async (req, res, next) => {

    const notif = await Notif.findById(req.params.id);
    
        Notif.findByIdAndRemove(req.params.id, (err, data) => {
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