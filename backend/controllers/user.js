const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const Userverification = require("../models/userVerification.js");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { OAuth2Client } = require("google-auth-library");
const SECRET_KEY = "knsincjjscbjdcjbbbej3e3u8b";
const googleClientId =
  "431980266310-k4b3dj9i3rqpmqag7bukt5b66h77pnae.apps.googleusercontent.com";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters long",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        error: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password)) {
      return res.status(400).json({
        success: false,
        error: "Password must contain at least one special symbol",
      });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      emailtoken: crypto.randomBytes(64).toString("hex"),
      verified: false,
    });

    await newUser.save();

    const mailOptions = {
      from: ` The Creator ${process.env.AUTH_EMAIL} `,
      to: newUser.email,
      subject: "Verify your Email",
      html: `<p>Verify your email ${newUser.username}</p>
      <p>Press <a href="http://${req.headers.host}/users/verify-email?token=${newUser.emailtoken}">Verify your mail</a></p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          error: "An error occurred while sending the verification email",
        });
      }
      res.status(200).json({
        success: true,
        message: "Please Check your mail",
      });
      // res.redirect("http://localhost:3000/signin?message=Please%20check%20your%20mail");


    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while registering the user",
    });
  }
};


exports.verify = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailtoken: token });

    if (user) {
      // user.emailtoken = null;
      user.verified = true;
      await user.save();


      // You might want to include a flash message to inform the user.

      res.redirect("https://charming-belekoy-1d7e17.netlify.app/signin");
    } else {

      // You might want to include an error message to inform the user.
      // req.flash("error", "Invalid or expired verification token.");
      res.redirect("https://charming-belekoy-1d7e17.netlify.app/");
    }
  } catch (error) {
    console.error(error);
    // Handle the error and inform the user.
    // req.flash("error", "An error occurred while verifying your email.");
    res.redirect("https://charming-belekoy-1d7e17.netlify.app/");
  }
};

exports.signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const userverify = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
 
    if (!userverify) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!userverify.verified) {

      return res.status(401).json({success: false,error: "Please verify yourself" });
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ success: true, message: "User signed in successfully", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred while signing in" });
  }
};


const client = new OAuth2Client(googleClientId);

exports.googleSignin = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClientId,
    });

    const { email, sub } = ticket.getPayload();

    // Check if the user's email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      // You might want to handle this case, maybe create a new user
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "User signed in with Google successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while signing in with Google" });
    console.error(error);
  }
};
