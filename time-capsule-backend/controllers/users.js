const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersRouter = require("express").Router();
const User = require("../models/user");
require("dotenv").config();
const {
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
} = require("../utils/middleware");

usersRouter.post("/", async (request, response) => {
  const { username, email, name, surname, password, role } = request.body;

  if (!username || !email || !name || !surname || !password) {
    return response.status(400).json({
      error: "All fields are required!",
    });
  }
  if (password.length < 8) {
    return response.status(400).json({
      error: "Password must be at least 8 characters",
    });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return response.status(400).json({
      error: "Username or email already exists!",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    name,
    surname,
    passwordHash,
    role,
  });

  try {
    const savedUser = await user.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
      role: savedUser.role,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "1h",
    });

    response.status(201).json({
      token,
      username: savedUser.username,
      email: savedUser.email,
      name: savedUser.name,
      surname: savedUser.surname,
      role: savedUser.role,
      id: savedUser._id,
    });
  } catch (error) {
    console.error("ERROR CREATING ", error);
    console.error(error.stack);
    response
      .status(500)
      .json({ error: "User creation failed. Please try again." });
  }
});
usersRouter.get(
  "/",
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
  async (request, response) => {
    const users = await User.find({}).populate("capsules", {
      title: 1,
      date: 1,
      content: 1,
      date: 1,
    });
    response.json(users);
  },
);

module.exports = usersRouter;
