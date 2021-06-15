const ReviewsCourse = require('../models/reviewsCourse');
const { json } = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const reviewsController = {};





/** get reviews by course */
reviewsController.get = async (req, res, next) => {
    ReviewsCourse.find({ CourseId: req.params.course_id }).populate({
      path:'UserId',
      model:'user'
    })
    .then(review => {res.status(200).json(review);console.log(review)})
    .catch(error => {res.status(400).json({ error });console.log(error)});
  };
/** end */

/* add review */
reviewsController.create = async (req, res, next) => {
  
    if (!req.body) {
        res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      }
      delete req.body._id;
      const review = new ReviewsCourse(
        {
        ...req.body,
        UserId:req.user.payload._id
 
      }
      );

      review.save()
      .then(() => { res.status(201).json(review);
        console.log(req.body);
     
    
      })
      .catch(error => {res.status(400).json({ error });console.log( error)});

	
};
/**end */

/**delete review */
reviewsController.delete = async (req, res, next) => {
    ReviewsCourse.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => {res.status(400).json({ error });console.log(error)});
    };
/**end */

/**count reviews */
reviewsController.count = async (req, res, next) => {
    ReviewsCourse.find({ CourseId: req.params.course_id }).count()
    .then(review => {res.status(200).json(review);console.log(review)})
     .catch(error => {res.status(400).json({ error });console.log(error)});
   
   };
 /**end */

/**update review */
reviewsController.update = async (req, res, next) => {
     ReviewsCourse.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
     .then((review) => res.status(200).json({ review}))
     .catch(error => res.status(400).json(error));
  };
/**end */

/**calculate sum of rating */
reviewsController.average = async (req, res, next) => {
  ReviewsCourse.aggregate([
    {
      $match: { CourseId:  mongoose.Types.ObjectId( req.params.course_id) }
    },
    {$group: {_id: {}, average: {     $avg: '$Rating'}}},             
    {$project:{_id:0}},{ $limit: 1 }
  ])
  .then(average => {res.status(200).json(average[0]);console.log(average)})
   .catch(error => {res.status(400).json({ error });console.log(error)});
 
 };

/**end */
 

reviewsController.finereview = async (req, res, next) => {
  ReviewsCourse.findOne({ _id: req.params.id }).populate({
    path:'UserId',
    model:'user'
  })
  .then(review => {res.status(200).json(review);console.log(review)})
  .catch(error => {res.status(400).json({ error });console.log(error)});
 
 };
 module.exports = reviewsController;