const express = require("express");
const app = express.Router();
const homeController = require("../controllers/post.js");
const authMiddleware = require("../controllers/authMiddleware.js");
const singleUpload = require("../controllers/multer.js");

app.post(
  "/createpost",
  authMiddleware,
  singleUpload,
  homeController.createPost
);
// app.post("/createstory", authMiddleware,homeController.createStory);
app.get("/allpost", authMiddleware, homeController.allPost);
app.post('/addcomment',authMiddleware,homeController.comments);
app.get("/userpost", authMiddleware, homeController.userPost);
app.post("/like", authMiddleware, homeController.like);

module.exports = app;
