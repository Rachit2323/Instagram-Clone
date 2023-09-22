const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  tags: [String],
  // userId: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  share_count: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Object, // Define comments as an object
    default: {},   // Initialize it as an empty object
  },

  // comments: [
  //   {
  //     type: String,
  //     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //   },
  // ],
  
  followers_count: {
    type: Number,
    default: 0,
  },
  followings_count: {
    type: Number,
    default: 0,
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
