const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   destination: 'https://3aweni.netlify.app/assets/uploads',
    filename: function (req, file, cb) {
       // console.log(file)
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

let uploadImage = multer({
    storage: storage,

    fileFilter: fileFilter,
});

module.exports = uploadImage.fields([{
    name: 'profilePicture', maxCount: 1
  }, {
    name: 'coverPicture', maxCount: 1
  },{
    name: 'cv', maxCount: 1
  }
])