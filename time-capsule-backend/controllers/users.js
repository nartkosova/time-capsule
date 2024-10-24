const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).json({ error: 'Username and password are required!' })
  }

  if (username.length < 3 ) {
    return response.status(400).json({ error: 'Username must be at least 3 characters long.' })
  }
  if (password.length < 8) {
    return response.status(400).json({ error: 'Password must be at least 8 characters long.' })
  }
  
  const existingUser = await User.findOne({ username, email })
  if (existingUser) {
    return response.status(400).json({ error: 'Username or email is already taken.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    email,
    name,
    surname,
    passwordHash,
    role,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})
usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1 });
    response.json(users);
  });
  

module.exports = usersRouter