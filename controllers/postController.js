const postController = {};
const Post = require("../models/post");
const Problem = require("../models/problem");
const sendMail = require("./sendMail");
const Comment = require("../models/comment");
postController.create = async (req, res, next) => {
  const { description, createdAt, category_id, username } = req.body;
  const { file } = req;

  const success = false;
  const newPost = new Post({
    description,
    createdAt,
    username,
    image: (file && file.filename) || null,
    category_id: req.category,
    Group: null,
    page: null,
  });
  try {
    const saved = await newPost.save();
    return res.send({
      success: true,
      post: saved,
    });
  } catch (error) {
    next(error);
  }
};

postController.createpostgroup = async (req, res, next) => {
  const { description, createdAt, category_id, username, Group } = req.body;
  const { file } = req;

  const success = false;
  const newPost = new Post({
    description,
    createdAt,
    username,
    image: (file && file.filename) || null,
    category_id: req.category,
    Group,
    page: null,
  });
  try {
    const saved = await newPost.save();
    return res.send({
      success: true,
      post: saved,
    });
  } catch (error) {
    next(error);
  }
};

postController.createpostpage = async (req, res, next) => {
  const { description, createdAt, category_id, username, page } = req.body;
  const { file } = req;

  const success = false;
  const newPost = new Post({
    description,
    createdAt,
    username,
    image: (file && file.filename) || null,
    category_id: req.category,
    page,
    Group: null,
  });
  try {
    const saved = await newPost.save();
    return res.send({
      success: true,
      post: saved,
    });
  } catch (error) {
    next(error);
  }
};

postController.get = async (req, res, next) => {
  try {
    const posts = await Post.find({ postType: null }).populate("username").sort({ createdAt: -1 });
    return res.send({ posts });
  } catch (error) {
    next(error);
  }
};

postController.delete = async (req, res, next) => {
 
  const post_id = req.params.post_id;
  try {
    const post = await Post.findOne({ _id: post_id }).populate("username");
    //si le job est supprim?? par l'admin
    if ( !post.username._id.equals(req.user.payload._id)) {
      sendMail(
        post.username.email,
        "Your post was deleted because it contains inappropriate content which violates our website???s Terms of Use"
      );
    }
    await Comment.find({ post_id: post_id }).deleteMany();
    await Post.deleteOne({ _id: post_id });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

postController.update = async (req, res, next) => {
  const post_id = req.params.post_id;
  const { description, image } = req.body;
  //upsert =true =>func for update and create at the same time
  try {
    const check = await Post.findOne({ _id: post_id });
    /*if (!check.owner.equals(req.user._id)) {
      const err = new Error("This expense object does not belong to you");
      err.status = 401;
      throw err;
    }*/
    const updatedDate = new Date();
    const post = await Post.updateOne({ _id: post_id }, { description, image });
    return res.send({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

postController.getById = async (req, res, next) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.find({ postType: null, _id: post_id }).limit(1);
    return res.send({ post });
  } catch (error) {
    next(error);
  }
};

postController.countByCat = async (req, res, next) => {
  const category_id = req.params.category_id;
  try {
    const nbposts = await Post.find({ postType: null, category_id: category_id }).count();
    return res.send({ nbposts });
  } catch (error) {
    next(error);
  }
};



postController.searchbytitle = async (req, res, next) => {

  try {
    const result = await Post.find({title :  {'$regex': req.params.title,$options:'i'} }).populate("username");
    return res.send({ result });
  } catch (error) {
    next(error);
  }
};



module.exports = postController;
