const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user.js");
const postRoutes=require("./routes/post.js");

app.use(express.json());

app.use("/users", userRoutes); 
app.use("/post", postRoutes); 

mongoose.connect("mongodb://localhost:27017/allthree", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});