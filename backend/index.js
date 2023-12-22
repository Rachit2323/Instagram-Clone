const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const cors = require("cors");

app.use(express.json());

app.use(cors());

cloudinary.v2.config({
  cloud_name: "dyedquiym",
  api_key: "154218675918319",
  api_secret: "d_TyO6pmhjEMcj2-CUooPs93bhI",
});

app.use("/users", userRoutes);
app.use("/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am here and running!");
});

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
