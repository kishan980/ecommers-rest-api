const {
  verifiyTokenAuthorization,
  verifiyTokenAdmin,
} = require("./verifiyToken");
const CryptoJS = require("crypto-js");
const User = require("../model/user.model");
const router = require("express").Router();

router.put("/:id", verifiyTokenAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      proccess.env.SECRET_PASSWORD
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...other } = updatedUser._doc;
    return res.status(200).json({ message: "updated user recoreds..", other });
  } catch (error) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", verifiyTokenAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("delete one recoreds");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/find/:id", verifiyTokenAdmin, async (req, res) => {
  try {
    const findUser = await User.findById({ _id: req.params.id });
    const { password, ...other } = findUser._doc;
    return res
      .status(200)
      .json({ data: other, message: "single rocored ares dispaly" });
  } catch (Error) {
    return res.status(500).json("error", Error);
  }
});

router.get("/findAllUser", verifiyTokenAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
      return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
});


router.get("/stats", verifiyTokenAdmin, async(req,res) =>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
  try{
    const data =await User.aggregate([
      {$match:{createdAt:{$gte:lastYear}}},
      {
        $project:{
          month:{$month:"$createdAt"}
        }
      },
      {
        $group:{
          _id:"$month",
          total:{$sum:1}
        }
      }
    ])
    return res.status(200).json(data)

  }catch(Error){
    return res.status(500).json("error",Error)
  }
})

module.exports = router;
