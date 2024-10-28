const capsulesRouter = require('express').Router()
const capsule = require('../models/capsule')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

capsulesRouter.get('/', async (request, response) => {
  try {
    const capsules = await capsule
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 });
    response.json(capsules);
  }
  catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

capsulesRouter.get('/:id', async (request, response, next) => {
  try {
    const capsule = await capsule.findById(request.params.id)
    if (capsule) {
      response.json(capsule)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})
capsulesRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const user = request.user
    
    if (!user) {
      return response.status(401).json({error: "User not found!"})
    }
       
    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'Title, Content or Date missing!' });
    }

    const capsule = new capsule({
      author: body.author || 'Unknown',

      title: body.title,
      content: body.author,
      date: body.date,
      fileInput: body.fileInput,
      fileName: body.fileName,
      fileType: body.fileType,
      user: user.id
    });
    const savedcapsule = await capsule.save();
    user.capsules = user.capsules.concat(savedcapsule._id);
    await user.save();
    response.status(201).json(savedcapsule);
    
    
  } catch (error) {
    response.status(500).json({ error: 'Failed to save the capsule!' });
  }
});
capsulesRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: 'User not found!' })
    }

    const capsule = await capsule.findById(request.params.id)

    if (!capsule) {
      return response.status(404).json({ error: 'Capsule not found!' })
    }

    if (capsule.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'Unauthorized to delete this capsule!' })
    }

    await capsule.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to delete the capsule!' })
  }
})
capsulesRouter.put('/:id', async (request, response) => {
  try {
    const { title, author, url, likes } = request.body;
    const updatedcapsule = await capsule.findByIdAndUpdate(
      request.params.id,
      { title, content, date, fileInput, fileName, fileType },
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1, id: 1 })

    if (updatedcapsule) {
      response.json(updatedcapsule);
    } else {
      response.status(404).json({ error: 'Capsule not found!' });
    }
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = capsulesRouter
