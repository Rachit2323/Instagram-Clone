const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
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
})

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
