const express = require("express");
const app = express.Router();
const userController = require('../controllers/user.js'); 
const authMiddleware=require('../controllers/authMiddleware.js'); 

app.post("/signin", userController.signin);
app.post("/signup", userController.signup);


module.exports = app;
