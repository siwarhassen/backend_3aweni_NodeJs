const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const uploadMulter = require('../middleware/uploadImage');

const {
    register, 
    forgotpassword, 
    login, 
    resetpassword, 
    googlelogin, 
    refreshToken, 
    linkedinlogin, 
    updateUser,
    getUserDetails,
    getAllUsersDetails,
    deleteUser,
    getUsers,updatePicture,updateCover,getUser,getPassword,searchbyusername
    
} = require('../controllers/auth');

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:token").post(resetpassword);
router.route("/googlelogin").post(googlelogin);
router.route("/refresh_token").post(refreshToken);
router.route("/linkedinlogin").post(linkedinlogin);//https://www.linkedin.com/developers/apps/60704483/auth
router.route("/update").put(protect,updateUser);
router.route("/updateprofilepicture").put(protect,updatePicture);
router.route("/updatecoverpicture").put(protect,updateCover);
router.route("/details_user").get(protect,getUserDetails);
router.route("/user/:id").get(protect,getUser);
router.route("/all_users").get(protect,getAllUsersDetails);
router.route("/delete/:id").delete(protect,deleteUser);
router.route("/users").get(protect,getUsers);
router.route("/getpassword/:email").post(getPassword);

router.route("/searchbyusername/:username").get(searchbyusername);



module.exports = router;