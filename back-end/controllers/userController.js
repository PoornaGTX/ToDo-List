const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

//user registration controller

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //validate the values
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  //check user already exsists
  const userAlreadyExsisits = await User.findOne({ email });

  if (userAlreadyExsisits) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password });

  //create token
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

//user Login controller

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  //get user data
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("invalid Credentials");
  }

  //check the password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("invalid  password");
  }

  //create token
  const token = user.createJWT();

  //undefined the password to front-end
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

//user details update controller

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  //validate the values
  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

//email verification for forget password
const frogetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  //get the user data
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("invalid Credentials");
  }

  //create one time link unique
  const secret = process.env.JWT_SECRET + user.password;

  const payload = {
    email: user.email,
    id: user.id,
  };

  //token
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  //email link
  console.log(token);
  const link = `http://localhost:3000/reset-password/${user.id}/${token}`;

  //email

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "ToDo Password Reset",
    text: link,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//create new password

const newPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  //get user data
  const user = await User.findOne({ _id: id });

  //check the user is exsisit
  if (!user) {
    throw new UnAuthenticatedError("invalid Credentials");
  }

  try {
    //verify token
    const secret = process.env.JWT_SECRET + user.password;
    const payload = jwt.verify(token, secret);

    //check the user email with payload email
    if (user.email !== payload.email) {
      throw new UnAuthenticatedError("invalid token");
    }
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  user.password = newPassword;
  await user.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "password has been reset please re-login" });
};

module.exports = { register, login, updateUser, frogetPassword, newPassword };
