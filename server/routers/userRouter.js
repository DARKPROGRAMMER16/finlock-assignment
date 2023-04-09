const router = require("express").Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register a new user
router.post("/", async (req, res) => {
  try {
    const { email, password, confirmPassword, username } = req.body;

    //validations
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        errorMessage: "Please Enter all required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account already exist with this email",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    // console.log(passworhash);

    //save new user account to database
    const newUser = new User({
      username,
      email,
      password: passwordhash,
    });
    const savedUser = await newUser.save();

    // if (savedUser) {
    //    res.status(200).json({
    //     message: "User created successfully",
    //   });
    // }

    //Sign in token
    const token = jwt.sign(
      {
        user: savedUser.username,
      },
      process.env.JWT_SECRET
    );

    // console.log(token);

    //send the token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//login in to the account
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "Please Enter all required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    //Sign in token
    const token = jwt.sign(
      {
        user: existingUser.username,
      },
      process.env.JWT_SECRET
    );

    // console.log(token);

    //send the token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
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

router.get("/loggedin", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.json({
        status: false,
        username: "",
      });

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      status: true,
      username: verifiedToken.user,
    });
  } catch (error) {
    res.json({
      status: false,
      username: "",
    });
  }
});

module.exports = router;
