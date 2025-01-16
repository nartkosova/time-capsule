const capsulesRouter = require("express").Router();
const capsule = require("../models/capsule");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const { upload } = require("../utils/cloudinary");
const {
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
} = require("../utils/middleware");

capsulesRouter.get(
  "/",
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
  async (request, response) => {
    try {
      const user = request.token;
      console.log("Userrrrrrrrrrrrrrrrrrrrrrrrr:", user);
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
    console.log("Userrrrrrrrrrrrrrrrrrrr:", User);
    try {
      const capsuleData = await capsule.findById(request.params.id).populate('user', {
        username: 1,
        name: 1,
        id: 1,
      });
      console.log("Capsule DATA:", capsuleData);
      console.log("Capsule DATA USER:", capsuleData.user.id.toString());
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

      if (!body.title || !body.content || !body.date) {
        return res
          .status(400)
          .json({ error: "Title, Content, or Date missing!" });
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

      res.status(201).json(savedcapsule);
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

    await capsuleData.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to delete the capsule!" });
  }
});
capsulesRouter.put("/:id", tokenExtractor, userExtractor, upload.single("file"), async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const fileInput = req.file ? req.file.path : null;

    const updatedCapsule = await capsule.findByIdAndUpdate(
      req.params.id,
      { title, content, date, fileInput },
      { new: true, runValidators: true },
    ).populate("user", { username: 1, name: 1, id: 1 });

    if (updatedCapsule) {
      res.json(updatedCapsule);
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
      console.log("UserRRRRRRRRRRRRR:", user);
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
        .populate("user", { username: 1, name: 1, id: 1 });
      response.json(userCapsules);
    } catch (error) {
      response.status(500).json({ error: "Something went wrong" });
    }
  },
);

module.exports = capsulesRouter;
