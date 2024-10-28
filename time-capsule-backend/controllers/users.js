const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/user');
require('dotenv').config();

usersRouter.post('/', async (request, response) => {
  const { username, email, name, surname, password } = request.body;

  if (!username || !email || !name || !surname || !password) {
    return response.status(400).json({
      error: 'All fields are required!',
    });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return response.status(400).json({
      error: 'Username or email already exists!',
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
  });

  try {
    const savedUser = await user.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

    response.status(201).json({
      token,
      username: savedUser.username,
      email: savedUser.email,
      name: savedUser.name,
      surname: savedUser.surname,
      id: savedUser._id,
    });
  } catch (error) {
    response.status(500).json({ error: 'User creation failed. Please try again.' });
  }
});

module.exports = usersRouter;
