const express = require("express");
const app = express.Router();
const homeController = require('../controllers/post.js'); 
const authMiddleware=require('../controllers/authMiddleware.js'); 

app.post("/createpost", authMiddleware,homeController.createPost);
app.post("/createstory", authMiddleware,homeController.createStory);
app.get("/allpost",authMiddleware,homeController.allPost);
app.get("/userpost",authMiddleware,homeController.userPost);
app.post("/like",authMiddleware,homeController.like);


module.exports = app;
