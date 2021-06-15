const UserCourse = require('../models/usercourse');
const { json } = require('body-parser');
var cors = require('cors');
const Certification = require('../models/certification');
const usercourseController = {};


/**Inscription */
usercourseController.create = async (req, res, next) => {
  
    
      delete req.body._id;
      const inscription = new UserCourse(
        {
        ...req.body,
        
        UserId:req.user.payload._id,
        Terminated:true
 
      }
      );
      inscription.save()
      .then(() => { res.status(201).json(inscription);
        console.log(req.body);
     
    
      })
      .catch(error => {res.status(400).json({ error });console.log( error)});

	
};

/**end */

/** UserId: req.params.UserId, */
/**find if user had is in */
usercourseController.find= (req, res, next) => {
    UserCourse.findOne({UserId: req.user.payload._id,CourseId: req.params.CourseId}).populate({
      path:'CourseId',
      model:'courses'
  })
      .then(course => res.status(200).json(course))
      .catch(error => res.status(404).json({ error }));
  };
/** end */

/**display courses of user */
usercourseController.displaycourses= (req, res, next) => {

console.log(req.user);
    UserCourse.find({UserId: req.user.payload._id,Terminated:true}).populate([{
        path:'CourseId',
        model:'courses',
        populate:{
          path:'UserId',
    model:'user'
        }
    },{path:'UserId',
    model:'user'}])
      .then(course => res.status(200).json(course))
      .catch(error => {res.status(404).json({ error });console.log(error)});
  };
/**end */



/**pass a quiz */
usercourseController.passquiz= (req, res, next) => {
  var Pass={
    ...req.body.PassQuiz,
    $push:{...req.body.PassQuiz.UserAnswer}
  
   };
   console.log(req.body.PassQuiz.UserAnswer);
  UserCourse.updateOne({_id: req.params.id }, 
    { $push: { PassQuiz:Pass } }
)
    .then(course => {res.status(200).json(course);})
    .catch(error => {res.status(404).json({ error });console.log(error)});
};
/**end */

/**get number of user inscri */
usercourseController.numberusers= (req, res, next) => {
  UserCourse.find({CourseId: req.params.CourseId}
).count()
    .then(usercourse => res.status(200).json(usercourse))
    .catch(error => {res.status(404).json({ error });console.log(error)});
};
/** */

/**verif if user pass a quiz */
usercourseController.verif= (req, res, next) => {

  UserCourse.findOne({_id: req.params.id,PassQuiz:{$elemMatch:{"Index":req.params.Index}}},{'PassQuiz.$': 1})
    .then(usercourse => res.status(200).json(usercourse))
    .catch(error => {res.status(404).json({ error });console.log(error)});
};
/**end */



/**verif if user will recieve certif */
usercourseController.willrecieve= (req, res, next) => {
  UserCourse.findOne({_id: req.params.id}
)
    .then(usercourse => res.status(200).json(usercourse))
    .catch(error => {res.status(404).json({ error });console.log(error)});
};
/**end */




/**delete the inscription of a user */
usercourseController.delete= (req, res, next) => {
  UserCourse.findOneAndDelete({ _id: req.params.id }, (error, response) => {
    if(error)
    {
      console.log(error);
    }

    Certification.deleteOne({ UserId: req.body.eventsAttended}, (err, res) => {
      if (err)
      {
        console.log(err);
      }
       
    })
  })
};
/**end */

/**find users regist in a course */
usercourseController.findusers= (req, res, next) => {
  UserCourse.find({CourseId: req.params.CourseId}
) .populate([{
  path:'UserId',
  model:'user'
},{
  path:'CourseId',
  model:'courses'
}])
    .then(usercourse => res.status(200).json(usercourse))
    .catch(error => {res.status(404).json({ error });console.log(error)});
};
/**end */



/**find users regist in a course order asc */
usercourseController.finduserstriAsc= (req, res, next) => {
  UserCourse.find({CourseId: req.params.CourseId}
) .populate([{
  path:'UserId',
  model:'user',
  sort: { username: -1 }
  
},{
  path:'CourseId',
  model:'courses'
}])
    .then(usercourse => res.status(200).json(usercourse))
    .catch(error => {res.status(404).json({ error });console.log(error)});
};
/**end */




/**most enrolled courses */
usercourseController.mostenrolled = async (req, res, next) => {
  UserCourse.aggregate([
    {
    $lookup: {
      from: 'courses',
      localField: 'CourseId',
      foreignField: '_id',
      as: 'CourseId'
  }},
  {
      $unwind: '$CourseId'
  },
    {$project:{_id:0,"CourseId.Name":1}},
    {$group: {_id: "$CourseId", sum: {$sum: 1}}},             
    { $limit: 10 }
  ])
  .then(average => {res.status(200).json(average);console.log(average)})
   .catch(error => {res.status(400).json({ error });console.log(error)});
 
 };
/**end */


/**update dipslay in home */
usercourseController.update= (req, res, next) => {
  UserCourse.updateOne({ _id: req.params.id }, {Terminated:false })
    .then(() => res.status(200).json({ message: 'usercourse modifie !'}))
    .catch(error => res.status(400).json({ error }));
};
/**end */


/**search course by name */
usercourseController.searchlikeuser = async (req, res, next) => {
  UserCourse.find({  "UserId.username" :  {'$regex': req.params.Name,$options:'i'} }).populate([{
    path:'UserId',
    model:'user'
    
  },{
    path:'CourseId',
    model:'courses'
  }])
  .then(usercourse => res.status(200).json(usercourse))
  .catch(error => {res.status(404).json({ error });console.log(error)});
};
/**end */

/**learn course */
usercourseController.learncourse= (req, res, next) => {
  UserCourse.findOne({_id: req.params.id}).populate({
    path:'CourseId',
    model:'courses'
})
    .then(course => res.status(200).json(course))
    .catch(error => res.status(404).json({ error }));
};
module.exports = usercourseController;