const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post=require('../models/post');
const authMiddleware=require('../controllers/authMiddleware.js'); 

exports.createPost=async(req,res)=>{
    try{

        const {title,description,tags}=req.body;
        const tagsArray = tags ? tags : [];
        console.log(title,description,tagsArray);
        const newPost = new Post({
            title,
            description,
            userId: req.userId
        });
      
          await newPost.save();

        res.status(200).json({ error: "Post created succesfully" });


    }catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "An error occurred during creatingPost" });
    }
}


exports.createStory=async(req,res)=>{
    try{

    }catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "An error occurred during creating Story" });

    }
}