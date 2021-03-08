let router = require("express").Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let User = require("../models/user");

router.post("/register", async (req, res) => {
  let { email, password, checkPassword } = req.body;
  console.log(email);

  //Data validation
  if (!email || !password || !checkPassword) {
    res.send("Need all fields to be not empty!!!");
  }

  //encrypting password

  let encryptedPassword = await bcrypt.hash(password, 10);

  //adding user to the database

  let newUser = new User({
    email,
    password: encryptedPassword,
  });

  await newUser.save();

  console.log(newUser);

  //   let token = jwt.sign(newUser, process.env.JWT_SECRET);
  //   res.cookie("jwt", token);
  //   console.log(token);
});

router.post("/login", (req, res) => {});

module.exports = router;
