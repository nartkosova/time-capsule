const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

console.log("connecting", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting", error);
  });

const capsuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  sendTo: {
    type: String,
    // required: true,
    match: [/.+@.+\..+/, "Please enter a valid email adress."],
  },
  fileInput: {
    type: Buffer,
  },
  sent: {
    type: String,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

capsuleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject.date) {
      returnedObject.date = new Date(returnedObject.date).toLocaleDateString(
        "en-GB",
      );
    }
  },
});

module.exports = mongoose.model("Capsule", capsuleSchema);
