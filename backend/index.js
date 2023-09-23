const express = require("express");
// const connectMongoDb=require('./database/connectMongoDb')
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const app = express();
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost', 
    methods: ['POST', 'GET'],   

  })
);
cloudinary.v2.config({
  cloud_name: "dyedquiym",
  api_key: "154218675918319",
  api_secret: "d_TyO6pmhjEMcj2-CUooPs93bhI",
});

app.use("/users", userRoutes);
app.use("/post", postRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
