const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  googleId:{
    type:String
  },
  // savepost: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Post',
  //   },
  // ],
  status:{
    type:Number,
    default:1,  // 0-> inactive 1 ->active
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
