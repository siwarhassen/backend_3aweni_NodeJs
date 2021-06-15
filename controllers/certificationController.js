const Certification = require('../models/certification');
const UserCourse = require('../models/usercourse');
const { json } = require('body-parser');
var cors = require('cors');
const sendMail = require('../mail/CourseMail');
const CertificationController = {};


/*get certif*/
CertificationController.create = async (req, res, next) => {
  

    delete req.body._id;
    const getcertif = new Certification(
      {
      ...req.body

    }
    );
    getcertif.save()
    .then((c) => { res.status(201).json(c);
      const url = `https://3aweni.netlify.app/certification/`+c._id;
      var todate=c.Date.getDate();
      var tomonth=c.Date.getMonth()+1;
      var toyear=c.Date.getFullYear();
      var original_date=tomonth+'/'+todate+'/'+toyear;
       sendMail("siwar.hassen@esprit.tn",c.Score,original_date,url);
      console.log(req.body);
   
  
    })
    .catch(error => {res.status(400).json({ error });console.log( error)});

  
};

/**end */

/*display certif*/
CertificationController.get = async (req, res, next) => {
    Certification.find({ "usercourse.CourseId._id": req.params.courseid, "usercourse.UserId._id": req.params.userid}).populate({
        path:'usercourse',
        model:'usercourse',
        populate : {
          path:'CourseId',
        model:'courses'
        }
    })
    .then(certif => {res.status(200).json(certif);console.log(certif)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/**end */


/**delete certificate  */
CertificationController.delete= (req, res, next) => {
  Certification.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};
/**end */


/*all certif by yser*/
CertificationController.certifofuser = async (req, res, next) => {
  Certification.find().populate({
      path:'usercourse',
      model:'usercourse',
      populate : {
        path:'CourseId',
      model:'courses'
      },
      match: { UserId: req.user.payload._id }
  })
  .then(certif => {res.status(200).json(certif);console.log(certif)})
  .catch(error => {res.status(400).json({ error });console.log(error)});
};
/**end */


/**detail certif */
CertificationController.detailcertif = async (req, res, next) => {
  Certification.findOne({_id:req.params.id}).populate({
      path:'usercourse',
      model:'usercourse',
     
      populate: [{
        path:'UserId',
        model:'user',
    },{
      path:'CourseId',
      model:'courses',
      populate:{
        path:'UserId',
        model:'user',
      }
    }]
     
    
  })
  .then(certif => {res.status(200).json(certif);console.log(certif)})
  .catch(error => {res.status(400).json({ error });console.log(error)});
};
/** end*/

module.exports = CertificationController;