const router = require("express").Router();
const User = require("../model/user.model");
const CryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const saveUserNew = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PASSWORD
    ).toString(),
  });
  try {
    const saveUser = await saveUserNew.save();
    return res.send({
      message: "User are register...",
      status: 201,
      data: saveUser,
    });
  } catch (error) {
    return res.send({
      message: `error is ${error}...`,
      status: 500,
      data: [],
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json({message:"Wrong Credentials!"})
    const hashePassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD
    );

    const passwordData =hashePassword.toString(CryptoJS.enc.Utf8);
    passwordData !== req.body.password 
    && res.status(401).json({message:"wrong credentials"})
    const accessToken = jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin
    },process.env.JWT_SCERET,{expiresIn:process.env.JWT_EXPIRE})
    const {password, ...others}=user._doc 
    return res.status(200).json({
        message:"user details",data:{...others,accessToken}
    })
  } catch (error) {
    return res.status(500).json({message:`error ${error}`})

  }
});

module.exports = router;
