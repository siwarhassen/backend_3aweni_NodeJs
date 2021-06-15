const cloudinary = require("cloudinary").v2;
const multer=require('multer');
const {CloudinaryStorage} =require("multer-storage-cloudinary");
const dotenv=require('dotenv');
dotenv.config()


cloudinary.config(
    {
        cloud_name:'aweni',
        api_key:714773446987464,
        api_secret:'grYx7JVEzSZSljWCdzCrv3U-lIE'


    }
)



const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"courses",
        format:async()=>"png",
        public_id:(req,file)=>file.filename,
    }
});

const parser=multer({storage:storage});
module.exports=parser;