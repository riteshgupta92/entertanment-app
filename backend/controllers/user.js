const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// transport.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // for hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashPassword,
    });

    // save to database
    await user.save();

    // generate access token
    const access_token = jwt.sign(
      {
        data: { id: user._id, email: user.email },
      },
      process.env.ACCESS_TOKEN_KEY
    );

    const refresh_token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d", // token will expires in 1 day
      }
    );

    // welcome email send to the user email

    const mailOptions = {
      from : process.env.EMAIL_USER,
      to : user.email,
      subject : "Welcome to Our App 😎",
      text :  `Hi ${user.email},\n\nWelcome to our app! We're excited to have you on board.`
    }

    // send the mail
    transport.sendMail(mailOptions, (err,info)=>{
      if(err){
        console.log("Error sending mail", err)
      }else{
        console.log("Email sent", info.response)
      }
    })
    return res.status(201).json({
      message: "User Created Successfully",
      user: { id: user._id, email: user.email },
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    // compare the password with hashpassword
    console.log("re", user.email, user.password, user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // generate access token
    console.log(
      "e",
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_KEY
    );
    const access_token = jwt.sign(
      {
        data: { id: user._id, email: user.email },
      },
      process.env.ACCESS_TOKEN_KEY
    );

    const refresh_token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d", // token will expires in 1 day
      }
    );
    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout };
