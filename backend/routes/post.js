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
app.get("/mypost", authMiddleware, homeController.myPost);
app.post("/searchpost", authMiddleware, homeController.searchPost);
app.post('/addcomment',authMiddleware,homeController.comments);
app.get("/userpost", authMiddleware, homeController.userPost);
app.post("/postlike", authMiddleware, homeController.handlelike);
app.post("/savepost",authMiddleware,homeController.savepost);
app.post("/mysavepost",authMiddleware,homeController.mysavepost);
app.post("/deletePost",authMiddleware,homeController.deletePost);
app.post("/editPost",authMiddleware,homeController.editPost);
app.post("/profileimg",authMiddleware,singleUpload,homeController.profile);



module.exports = app;
