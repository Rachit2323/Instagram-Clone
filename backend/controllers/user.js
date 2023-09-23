const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const SECRET_KEY = "knsincjjscbjdcjbbbej3e3u8b";
const googleClientId = "431980266310-k4b3dj9i3rqpmqag7bukt5b66h77pnae.apps.googleusercontent.com";

exports.signup = async (req, res) => {
  try {
  
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({success:false, error: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success:false,error: "Password must be at least 8 characters long" });
    }

    if (!/[A-Z]/.test(password)) {
      return res
        .status(400)
        .json({ success:false,error: "Password must contain at least one uppercase letter" });
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password)) {
      return res
        .status(400)
        .json({ success:false,error: "Password must contain at least one special symbol" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ success:true,error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({success:true, message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success:false,error: "An error occurred while registering the user" });
    console.log(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({success:false, error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({success:false, error: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
         res.status(200).json({ success:true,message: "User signed in successfully", token });
  } catch (error) {
    res.status(500).json({ success:false,error: "An error occurred while signing in" });
    console.log(error);
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

    res.status(200).json({ message: "User signed in with Google successfully", token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while signing in with Google" });
    console.error(error);
  }
};

