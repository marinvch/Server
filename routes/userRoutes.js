const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already exist!!!" });
    }

    //seting username

    //incrypting password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      passwordHash,
      username,
    });
    console.log(newUser);

    const savedUser = await newUser.save();

    //adding Token to the user
    let token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    //send token in coockie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
