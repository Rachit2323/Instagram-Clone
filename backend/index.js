const express = require("express");
const connectMongoDb=require('./database/connectMongoDb')

const app = express();

const userRoutes = require("./routes/user.js");
const postRoutes=require("./routes/post.js");

app.use(express.json());

connectMongoDb()

app.use("/users", userRoutes); 
app.use("/post", postRoutes); 

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
