const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type:Number,
    default:0,
  },
  share_count:{
    type:Number,
    default:0,
  },
  comments_count:{
    type:Number,
    default:0,
  },
  followers_count:{
    type:Number,
    default:0,
  },
  followings_count:{
    type:Number,
    default:0,
  }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
