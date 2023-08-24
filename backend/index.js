const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const postRoutes=require("./routes/post.js");

app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));



app.use("/users", userRoutes); 
app.use("/post", postRoutes); 

// 
// mongodb+srv://Rachit23:UhP8Iiyp4xxptvmM@cluster0.fgnb20h.mongodb.net/startup
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