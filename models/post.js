const mongoose = require("mongoose");
const { Schema } = mongoose;
const extendSchema = require("mongoose-extend-schema");
const User = require("./User");
const Group = require("./Group");
const Page = require("./Page");
const postOptions = {
  discriminatorKey: "postType",
  timestamps: true,
};

const PostSchema = Schema(
  {
    description: { type: String },

    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    Group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Group,
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Page,
    },
    image: { type: String },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryPost",
    },
  },

  postOptions
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

/*const ProblemSchema = extendSchema(
  PostSchema,
  {
    title: { type: String, required: true },
  },
  postOptions
);*/
