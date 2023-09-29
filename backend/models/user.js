const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  profileimg: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    },
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
  googleId: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  emailtoken:{
    type:String,
  },
  verified: {
    type: Boolean,
    default:"false"
  },
  status: {
    type: Number,
    default: 1, // 0-> inactive 1 ->active
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
