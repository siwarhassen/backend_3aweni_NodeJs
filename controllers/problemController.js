const problemController = {};
const Post = require("../models/post");
const Problem = require("../models/problem");
const postController = require("./postController");
var MongooseSuper = require("mongoose-super");
const sendMail = require("./sendMail");
const Comment = require("../models/comment");
var inherit = MongooseSuper.createInherit();

problemController.create = async (req, res, next) => {
  const { title, description, createdAt, image, category_id, username } = req.body;
  const newProblem = new Problem({ title, description, createdAt, image, category_id, username });
  try {
    const saved = await newProblem.save();
    return res.send({
      success: true,
      problem: saved,
    });
  } catch (error) {
    next(error);
  }
};

problemController.get = async (req, res, next) => {
  try {
    const problems = await Problem.find().populate("username").sort({ createdAt: -1 });
    return res.send({ problems });
  } catch (error) {
    next(error);
  }
};

problemController.delete = async (req, res, next) => {
  const problem_id = req.params.problem_id;
  try {
    const problem = await Problem.findOne({ _id: problem_id }).populate("username");
    //si le job est supprimé par l'admin
    if ( !problem.username._id.equals(req.user.payload._id)) {
      sendMail(
        problem.username.email,
        "Your problem post was deleted because it contains inappropriate content which violates our website’s Terms of Use"
      );
    }
    await Comment.find({ post_id: problem_id }).deleteMany();
    await Problem.deleteOne({ _id: problem_id });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

problemController.update = async (req, res, next) => {
  const problem_id = req.params.problem_id;
  const { description, image, createdAt, title } = req.body;
  //upsert =true =>func for update and create at the same time
  try {
    const check = await Problem.findOne({ _id: problem_id });
    /*if (!check.owner.equals(req.user._id)) {
      const err = new Error("This expense object does not belong to you");
      err.status = 401;
      throw err;
    }*/
    const updatedDate = new Date();
    const problem = await Problem.update(
      { _id: problem_id },
      { description, createdAt, image, title }
    );
    return res.send({
      success: true,
      problem,
    });
  } catch (error) {
    next(error);
  }
};

problemController.getNbProblemsByCat = async (req, res, next) => {
  const cat_id = req.params.cat_id;
  try {
    const result = await Problem.find({ category_id: cat_id }).count();
    return res.send({ result });
  } catch (error) {
    next(error);
  }
};

problemController.getById = async (req, res, next) => {
  const problem_id = req.params.problem_id;
  try {
    const problem = await Problem.findOne({ _id: problem_id }).populate("username");
    return res.send({ problem });
  } catch (error) {
    next(error);
  }
};

problemController.getByUser = async (req, res, next) => {
  const username = req.params.username;

  try {
    const problems = await Problem.find({ username: username })
      .populate("username")
      .sort({ createdAt: -1 });
    return res.send({ problems });
  } catch (error) {
    next(error);
  }
};

problemController.countByCat = async (req, res, next) => {
  try {
    const nbproblems = await Problem.aggregate([
      {
        $group: {
          _id: "$category_id",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    await Problem.populate(nbproblems, {
      path: "_id",
      model: "CategoryPost",
    });

    return res.send({ nbproblems });
  } catch (error) {
    next(error);
  }
};

problemController.searchbytitle = async (req, res, next) => {

  try {
    const result = await Problem.find({title :  {'$regex': req.params.title,$options:'$i'} }).populate("username");
    return res.send({ result });
  } catch (error) {
    next(error);
  }
};


/** get similair courses */
problemController.similairproblems = async (req, res, next) => {
  Problem.find().limit(4)
  .then(problem => res.status(200).json(problem))
  .catch(error => res.status(400).json({ error }));
};
/**end */

module.exports = problemController;
