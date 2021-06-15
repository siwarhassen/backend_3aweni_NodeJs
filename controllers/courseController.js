const Course = require('../models/course');
const { json } = require('body-parser');
const User = require('../models/User');
const drive = require('../Api/google');
const path=require('path');
const fs=require('fs');
const UserCourse = require('../models/usercourse');
const filePath=path.join(__dirname,'html5.jpg');
const courseController = {};



/**add course */
courseController.google = async (req, res, next) => {
  try {
    console.log(req.body.File);
    const response=await drive.files.create({
 
        requestBody:{
            name: req.body.File,
            mimeType:'image/pdf',
        },
        media:{
           mimeType :'image/pdf',
           body:fs.createReadStream('uploads/'+req.body.File),
        }
    
    })
        }
        catch(error){
          console.log(error);
    
        }
};
/**end add course */

/**add course */
courseController.create = async (req, res, next) => {

    const url = req.protocol + '://' + req.get('host');
   
 
    delete req.body._id;
    const course = new Course({
        ...req.body,
        Module:JSON.parse(req.body.Module),
    
        Photo:req.file.path,
        UserId:req.user.payload._id
      });


   course.save()
    .then(() =>{res.status(201).json(course);

   

    } )
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/**end add course */





/**update course */
courseController.update = async (req, res, next) => {
  
  const url = req.protocol + '://' + req.get('host')
     if(req.file!=undefined)
   {    Course.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id ,   Module:JSON.parse(req.body.Module), Photo: req.file.path },{new: true}).populate({
    path:'UserId',
    model:'user'
  })
   .then((course) => res.status(200).json({ course}))
   .catch(error => {res.status(400).json(error);console.log(error)});
}

  Course.findByIdAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id , Module:JSON.parse(req.body.Module)},{new: true}).populate({
    path:'UserId',
    model:'user'
  })
    .then((course) => res.status(200).json({ course}))
    .catch(error => {res.status(400).json(error);console.log(error)});


};
/**end update */


/** get all courses*/
courseController.get = async (req, res, next) => {
    Course.find().populate({
      path:'UserId',
      model:'user'
    })
  .then(course => {res.status(200).json(course);})
  .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/** end */


/** get similair courses */
courseController.similaircourses = async (req, res, next) => {
    Course.find({ Category:req.params.Category,Level:req.params.Level }).limit(4)
    .then(course => res.status(200).json(course))
    .catch(error => res.status(400).json({ error }));
  };
/**end */



/**detail course */
courseController.detailcourse= (req, res, next) => {
    Course.findOne({ _id: req.params.id })
      .then(course => res.status(200).json(course))
      .catch(error => res.status(404).json({ error }));
  };
/** end */


/**delete course  */
courseController.deletecourse= (req, res, next) => {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };
/**end */



/*find quiz*/ 
courseController.displayquiz= async(req, res, next) => {

    const course = await Course.findOne({ _id: req.params.id },{_id:0,'Module.Quiz':1});

    return res.json(course);
 /* const result= Course.findOne({ _id: req.params.id }).aggregate([
        {$unwind : '$Module'},
        {$project : {'_id': 0 , 'Quiz' : '$Module.Quiz'}},
        {$unwind : '$Quiz'},
    
])*/
  };
/**end  */



/**courses added by user */
courseController.coursesbyuser = async (req, res, next) => {
    Course.find({ UserId: req.user.payload._id }).populate({
      path:'UserId',
      model:'user'
    })
  .then(course => {res.status(200).json(course);})
  .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/**end  */
/**courses added by user */
courseController.listofcoursesbyuser = async (req, res, next) => {
  Course.find({ UserId: req.params.UserId }).populate({
    path:'UserId',
    model:'user'
  })
.then(course => {res.status(200).json(course);})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/**end  */

/**search course by name */
courseController.searchlikename = async (req, res, next) => {
  Course.find({Name :  {'$regex': req.params.Name,$options:'i'} })
.then(course => {res.status(200).json(course);})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/**end */


/**search course by name */
courseController.filterbylevel = async (req, res, next) => {
  Course.find({Level : req.params.Level })
.then(course => {res.status(200).json(course);})
.catch(error => {res.status(400).json({ error });console.log(error)});
};
/**end */


  module.exports = courseController;