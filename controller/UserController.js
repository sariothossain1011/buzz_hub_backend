const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER REGISTRATION API
exports.Registration = async (req, res) => {
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "This email already exist. Try another one." });
    }
    const userItem = await UserModel({
      fName: req.body.fName,
      lName: req.body.lName,
      phone: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    const user = await userItem.save();
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Registration fail" });
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      id: user._id,
      fName: user.fName,
      lName: user.lName,
      phone: user.phone,
      email: user.email,
      token: token,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

// USER LOGIN API
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json("This user not found");
    }
    const check = await bcrypt.compareSync(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      id: user._id,
      fName: user.fName,
      lName: user.lName,
      phone: user.phone,
      email: user.email,
      token: token,

      message: "success",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
