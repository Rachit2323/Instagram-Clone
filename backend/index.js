const express = require("express");
const connectMongoDb=require('./database/connectMongoDb')

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


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
