const capsulesRouter = require("express").Router();
const capsule = require("../models/capsule");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const sendCapsule = require("../utils/sendCapsule");
const { upload } = require("../utils/cloudinary");
const {
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
} = require("../utils/middleware");
const mongoose = require("mongoose");

capsulesRouter.get(
  "/",
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
  async (request, response) => {
    try {
      const user = request.token;
      const capsules = await capsule
        .find({})
        .populate("user", { username: 1, name: 1, id: 1 });
      response.json(capsules);
    } catch (error) {
      response.status(500).json({ error: "Something went wrong" });
    }
  },
);
capsulesRouter.get(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    const User = request.user;
    try {
      const capsuleData = await capsule.findById(request.params.id).populate('user', {
        username: 1,
        name: 1,
        id: 1,
      });
      if (capsuleData.user.id.toString() !== User.id.toString() && User.role !== "admin") {
        return response
          .status(403)
          .json({ error: "Unauthorized to view this capsule!" });
      }
      if (User.role === "admin") {
        response.json(capsuleData);
      }
      if (capsuleData) {
        response.json(capsuleData);
      } else {
        response.status(404).end();
      }
    } catch (error) {
      next(error);
    }
  },
);
capsulesRouter.post(
  "/",
  upload.single("file"),
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      const body = req.body;
      const user = req.user;

      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }

      if (!body.title) {
        return res.status(400).json({ error: "Title is missing!" });
      }
      
      if (!body.content) {
        return res.status(400).json({ error: "Content is missing!" });
      }
      
      if (!body.date) {
        return res.status(400).json({ error: "Date is missing!" });
      }
      
      if (!body.sendTo) {
        return res.status(400).json({ error: "Email is missing!" });
      }

      if (!user.capsules) {
        user.capsules = [];
      }

      const newCapsule = new capsule({
        title: body.title,
        content: body.content,
        sendTo: body.sendTo,
        date: body.date,
        fileInput: req.file ? req.file.path : null,
        user: user._id,
      });

      const savedcapsule = await newCapsule.save();
      user.capsules = user.capsules.concat(savedcapsule._id);
      await user.save();

      try {
        await sendCapsule(savedcapsule);
        console.log(`Email sent to ${savedcapsule.sendTo}`);
      } catch (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({
          error: "Capsule created but email failed to send!",
        });
      }

      res.status(201).json({message: "Capsule created successfully!"});
    } catch (error) {
      console.error("Failed to save capsule", error);
      res.status(500).json({ error: "Failed to save the capsule!" });
    }
  },
);
capsulesRouter.delete("/:id", tokenExtractor, userExtractor, async (request, response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "User not found!" });
    }

    const capsuleData = await capsule.findById(request.params.id);

    if (!capsuleData) {
      return response.status(404).json({ error: "Capsule not found!" });
    }

    if (capsuleData.user.toString() !== user.id.toString()) {
      return response
        .status(403)
        .json({ error: "Unauthorized to delete this capsule!" });
    }

    await capsule.findByIdAndDelete(request.params.id);
    return response
    .status(204)
    .json({ message: "Capsule deleted successfully!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to delete the capsule!" });
  }
});
capsulesRouter.put("/:id", tokenExtractor, userExtractor, upload.single("file"), async (req, res) => {
  const { id } = req.params;
  const { title, content, date } = req.body;
  const fileInput = req.file ? req.file.path : null;
  // const user = request.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid capsule ID' });
  }
  // if (user.id.toString() !== id) {
  //   return response
  //     .status(403)
  //     .json({ error: "Access denied! You can only edit your own capsules." });
  // }

  try {
    const updatedCapsule = await capsule.findByIdAndUpdate(
      req.params.id,
      { title, content, date, fileInput },
      { new: true, runValidators: true },
    ).populate("user", { username: 1, name: 1, id: 1 });

    if (updatedCapsule) {
      return res.status(200).json({ message: "Capsule updated successfully!"});
    } else {
      res.status(404).json({ error: "Capsule not found!" });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(400).json({ error: "Bad Request" });
  }
});
capsulesRouter.get(
  "/user/:userId",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    try {
      const { userId } = request.params;
      const user = request.user;
      if (!user) {
        return response.status(401).json({ error: "Unauthorized access!" });
      }

      if (user.id.toString() !== userId) {
        return response
          .status(403)
          .json({ error: "Access denied! You can only view your own capsules." });
      }

      const userCapsules = await capsule
        .find({ user: userId })
        .populate("user", { username: 1, name: 1, id: 1, role: 1 });
      response.json(userCapsules);
    } catch (error) {
      response.status(500).json({ error: "Something went wrong" });
    }
  },
);

module.exports = capsulesRouter;
