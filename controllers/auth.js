const User = require('../models/User');
const Followuser = require('../models/Followuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendMail = require('../utils/sendEmail');
const jwt_decode  = require("jwt-decode");
const {OAuth2Client} = require('google-auth-library');

const {CLIENT_URL} = process.env
const client = new OAuth2Client(process.env.CLIENT_ID)


exports.register = async function(req, res, next) {
    const{username,email,password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    try{
        if (password.length <6)
            return res.status(400).json({msg: "password must at least 6 "})
        const user= await User.create({
            username, email, password: passwordHash
        });

        const token = sendToken(user);

        res.status(201).json({
            success: true,
            token: token
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


exports.getPassword = async (req,res) => {

    try{
        const user = await User.findOne({ email: req.params.email });

        if(!user){
            res.status(404).json({ 
                success:false,
                error: "Invalid credentials"})
        }
        const token = sendToken(user);

        res.cookie('refreshtoken',token, {
            httpOnly: true,
            path: '/api/auth/refresh_token',
            maxAge: 7*24*60*60*1000 // 7days
        })
        res.status(200).json({ 
            success:true,
            token: token});

    } catch (error){
        res.status(500).json({ 
            success:false,
            error: error.message});
 
    }


}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    
    if (!email || !password)
            res.status(404).json({ 
                success:false,
                error: "Please provide amail and password"})
     
    try{
        const user = await User.findOne({ email }).select("+password");

        if(!user){
            res.status(404).json({ 
                success:false,
                error: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(404).json({ 
                success:false,
                error: "Invalid credentialss"})
        }

        const token = sendToken(user);

        res.cookie('refreshtoken',token, {
            httpOnly: true,
            path: '/api/auth/refresh_token',
            maxAge: 7*24*60*60*1000 // 7days
        })

        res.status(200).json({ 
            success:true,
            token: token});

    } catch (error){
        res.status(500).json({ 
            success:false,
            error: error.message});
 
    }
}

exports.forgotpassword = async (req, res, next) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})  
        if(!user)return res.status(400).json({ 
                        success:true,
                        message: "This mail does not exist!"});
   
        const token = sendToken({id: user._id})
        const url = `${CLIENT_URL}/api/auth/resetpassword/${token}`
        sendMail(email,url,"Rest Your password")
        res.status(200).json({ 
            success:true,
            message: "Re-send Une password, please check your email."});
    } catch (err) {
        res.status(500).json({ 
            success:false,
            error: error.message});
    }
}

exports.resetpassword = async (req, res, next) => {
    try {
        const {password} = req.body
        console.log(password)
        const passwordHash = await bcrypt.hash(password,12)
        console.log(req.params)
        const decoded = jwt_decode(req.params['token']);
        console.log(decoded.payload.id)
      
        await User.findOneAndUpdate({_id: decoded.payload.id}, {
            password:passwordHash
        })

        res.json({message:"Password successfully changed!"})
    } catch (err) {
        return res.status(500).json({error: err.message})   
    }
}

exports.googlelogin = async (req, res, next) => {

    try {
        const {tokenId} = req.body
        const verify  = await client.verifyIdToken({idToken : tokenId, audience: process.env.CLIENT_ID})
        const {email_verified, email, name, picture } = verify.payload
        const password = email + process.env.GOOGLE_SECRET
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
       
       //console.log(email_verified)
       //console.log(verify)
       if(!email_verified)   
            return res.status(400).json({msg: "Email verification failed."});
       const user = await User.findOne({email});
       if (user) 
       {
           //const isMatch = await bcrypt.compare(password,user.password);
            let isMatch;
            if(passwordHash == user.password){
                 isMatch=true
            }
            if(isMatch == false){
            res.status(404).json({ 
                success:false,
                error: "password is incorrect"})
        } 
           
           const token = sendToken({_id:user._id});
           console.log(token);

            res.cookie('refreshtoken',token, {
                httpOnly: true,
                path: '/api/auth/refresh_token',
                maxAge: 7*24*60*60*1000 // 7days
            })

            res.status(201).json({
                success: true,
                token: token
                    });
           res.json({msg: "Login success!"})
       }
       else
           {
            const newUser = new User({
                username: name, email: email, password: passwordHash, profilePicture: picture
            })
            await newUser.save();
            const token = sendToken({_id:newUser._id});

            res.cookie('refreshtoken',token, {
                httpOnly: true,
                path: '/api/auth/refresh_token',
                maxAge: 7*24*60*60*1000 // 7days
            })

            res.status(201).json({
                success: true,
                token: token,
            });
               res.json({msg: "Login success!"})
           }

               } catch (err) {
                           return res.status(500).json({msg: err.message})      
            }   
};

exports.refreshToken = async (req, res, next) => {
    try{
        const token = req.cookies.refreshtoken;
        if(!token) 
            return res.status(400).json({message: "Please Login now !"})
        
        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET , (err,user) => {
            if (err) return res.status(400).json({message: "Please Login now !"})
            const access_token = sendToken({id:user.id})
            res.json({access_token})
            console.log(user)
        })
        
                }
    catch (err) {
        return res.status(500).json({error: err.message})
            
    }

}

const sendToken = (payload) => {
    return jwt.sign({payload} , (process.env.JWT_SECRET), {expiresIn: process.env.JWT_EXPIRE,});
};

exports.linkedinlogin = async (req, res, next) => {
  
  }

exports.updateUser = async (req,res) => {
     const user = await User.findById(req.user.payload._id)
            if (user){
               // 
                await User.findOneAndUpdate({_id:req.user.payload._id}, {...req.body})  
                res.status(200).json({
                    sucess: true,
                    data: user
                });
                console.log(req.user.payload._id)
            }else{
                res.status(400).json({
                    sucess: false,
                    data: "user not found"
                });
            } 

}

exports.updatePicture = async (req,res) => {
    const user = await User.findById(req.user.payload._id)
           if (user){
                const {profilePicture} = req.body
               await User.findOneAndUpdate({_id:req.user.payload._id}, {profilePicture})  
               res.status(200).json({
                   sucess: true,
                   data: user
               });
               console.log(req.user.payload._id)
           }else{
               res.status(400).json({
                   sucess: false,
                   data: "user not found"
               });
           } 

}

exports.updateCover = async (req,res) => {
    const user = await User.findById(req.user.payload._id)
           if (user){
                const {coverPicture} = req.body
               await User.findOneAndUpdate({_id:req.user.payload._id}, {coverPicture})  
               res.status(200).json({
                   sucess: true,
                   data: user
               });
               console.log(req.user.payload._id)
           }else{
               res.status(400).json({
                   sucess: false,
                   data: "user not found"
               });
           } 

}


exports.getUserDetails = async(req,res) => {
    const user = await User.findById(req.user.payload._id)
    if (user){
        res.status(200).json({
            sucess: true,
            data: user
        });
        console.log(req.user.payload)
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
    
}

exports.getUser = async(req,res) => {
    const user = await User.findById(req.params.id)
    if (user){
        res.status(200).json({
            sucess: true,
            data: user
        });
        console.log(req.user.payload)
    }else{
        res.status(400).json({
            sucess: false,
            data: "user not found"
        });
    }
    
}



exports.searchbyusername= async (req, res, next) => {

    try {
      const result = await User.find({username :  {'$regex': req.params.username, $options: "$i"} });
      return res.send({ result });
    } catch (error) {
      next(error);
    }
  };

/** Afficher les users non suivis par le user connecté */
exports.getAllUsersDetails = async (req,res) => {
    const user =  User.findById(req.user.payload._id)
    const followers = await Followuser.find({UserId: req.user.payload._id})
        const users = await User.find()
        let u=[];
        let uu=[];
        for (let i of users){
            if(req.user.payload._id != i._id){
                u.push(i)
            }
        }
    res.json(u)
    console.log(req.user.payload)
}

exports.deleteUser = async (req,res) => {
    const user = await User.findById(req.user.payload._id)
    if(user.role == 1){
        User.findByIdAndRemove(req.params.id, 
            function (err, docs) {
                res.status(200).json({
                    sucess: true,
                    data: "user deleted"
                });
        })
    }else{
        res.status(400).json({
            sucess: false,
            data: "Not admin, not allowed to delete the user"
        });
    }

}

exports.getUsers = async (req,res) => {
    const user = await User.findById(req.user.payload._id)
    if(user){
        const {username} = req.body
        User.find({username: {$regex:`^${req.body.username}`}}, function (err, users){
            if (!err) { res.send(users); }
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