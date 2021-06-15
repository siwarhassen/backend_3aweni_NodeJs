const multer =require('multer');

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'uploads/');    
    }, 
    filename: function (req, file, cb) { 
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
       cb(null , file.originalname);   
    }
 });
 const fileFilter = (req, file, cb) => {
   if(file.mimetype==='image/jpg' || file.mimetype==='image/^png')
   {
    cb(null , true);   
   }
   else{
       cb({message:'Unsupported File Format'},false)
   }
};

const upload=multer(
    {
        storage:storage,
        fileFilter:fileFilter

    }
)

module.exports=upload;