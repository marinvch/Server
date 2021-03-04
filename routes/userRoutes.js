const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    let { email, username, password, checkPassword } = req.body;

    //validation
    if (!email || !password || !checkPassword) {
      return res.status(400).json({ msg: "Not all fields were not entered!!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password need to be minimum 8 characters long" });
    }

    if (password !== checkPassword) {
      return res.status(400).json({ msg: "Passwords need to be the same" });
    }

    if (username === null) {
      username = email;
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already exist!!!" });
    }

    //seting username

    //incrypting password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);

    //adding Token to the user

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.TOKEN_SECRET
    );

    //sending token with http cookie

    res.cookie("token", token, {
      httpOnly: true,
    });

    console.log(token);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
