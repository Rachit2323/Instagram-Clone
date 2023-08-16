const express = require("express");
const app = express.Router();
const homeController = require('../controllers/post.js'); 
const authMiddleware=require('../controllers/authMiddleware.js'); 

app.post("/createpost", authMiddleware,homeController.createPost);

module.exports = app;
