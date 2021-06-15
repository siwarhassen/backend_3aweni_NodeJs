const fs = require('fs');

exports.uploadimage = (req,res,next) => {
    if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "file not support"
        })
    }

    if (req.file.size > 1024 * 1024) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "File is Too large"
        })
    }
    res.status(200).json({
        sucess: true,
        data: "you got access to the private data in this route",
    });
};

//https://www.youtube.com/watch?v=EXga3cFVRIU
//https://github.com/Mohammed-Abdelhady/MERN-Uload-Image/blob/master/middlewares/validation.js