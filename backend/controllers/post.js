const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByIdAndUpdate } = require("../models/post");
const Post = require("../models/post");

const Story = require("../models/story.js");

exports.createPost = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const tagsArray = tags ? tags : [];

    const newPost = new Post({
      title,
      description,
      postedBy: req.userId,
    });

    await newPost.save();
    res.status(200).json({ success: true, error: "Post created succesfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred during creatingPost" });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const tagsArray = tags ? tags : [];
    console.log(title, description, tagsArray);
    const newPost = new Story({
      title,
      description,
      postedBy: req.userId,
    });

    await newPost.save();

    res.status(200).json({ success: true, error: "Story created succesfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        error: "An error occurred during creating Story",
      });
  }
}; 

exports.allPost = async (req, res) => {
    try {
      const allpost = await Post.find();
      res
        .status(200)
        .json({ success: true, allpost, message: "Posts fetched successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error: "An error occurred while fetching posts" });
    }
  };
  
exports.userPost=async(req,res)=>{
    try{
      const userPost=await Post.find({postedBy:req.userId});
      res.status(200).json({success:true,userPost, message: "Posts fetched successfully" });

    }catch(error)
    {
        res
        .status(500)
        .json({ success: false, error: "An error occurred while fetching posts" });
    }
}

exports.like = async (req, res) => {
  try {
    const postId = req.body.PostId;
    const userId = req.userId;

    // Check if the user has already liked the post
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      return res.status(400).json({ success: false, error: "Post already liked" });
    }


    await Post.findByIdAndUpdate(req.body.PostId, {
      $push: { likes: req.userId },
    }, { new: true });   // it is used to give  recently updated data 
    

    res.status(200).json({ success: true, message: "Post liked" });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred while liking the post" });
  }
};

exports.unlike = async (req, res) => {
  try {
    const postId = req.body.PostId;
    const userId = req.userId;

    // Check if the user has already liked the post
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(req.body.PostId, {
        $pull: { likes: req.userId },
      }, { new: true });   // it is used to give  recently updated data 

    }
    res.status(200).json({ success: true, message: "Post Unliked" });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred while liking the post" });
  }
};

exports.comment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.userId;

    const comment = {
      text: text,
      postedBy: userId,
    };

    const postId = req.body.PostId;

    // Update the post's comments array
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    });

    res.status(200).json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "An error occurred while adding the comment" });
  }
};
