const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting', error)
    })

const capsuleSchema = new mongoose.Schema({
    title: 
    {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    fileInput: {
        type: Buffer,  
    },
    fileName: {
        type: String, 
    },
    fileType: {
        type: String,  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

capsuleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })

  module.exports = mongoose.model('Capsule', capsuleSchema);