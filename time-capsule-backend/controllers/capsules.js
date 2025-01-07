const capsulesRouter = require("express").Router();
const capsule = require("../models/capsule");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { upload } = require("../utils/cloudinary");
const {
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
} = require("../utils/middleware");

// capsulesRouter.use(tokenExtractor, userExtractor)

capsulesRouter.get(
  "/",
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
  async (request, response) => {
    try {
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
  authorizeAdmin,
  async (request, response, next) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);
      console.log("User:", req.user);
      const capsule = await capsule.findById(request.params.id);
      if (capsule) {
        response.json(capsule);
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
  tokenExtractor,
  userExtractor,
  upload.single("file"),
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

      const newCapsule = new capsule({
        title: body.title,
        content: body.content,
        sendTo: body.sendTo,
        date: body.date,
        fileInput: req.file.path,
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
capsulesRouter.delete("/:id", async (request, response) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "User not found!" });
    }

    const capsule = await capsule.findById(request.params.id);

    if (!capsule) {
      return response.status(404).json({ error: "Capsule not found!" });
    }

    if (capsule.user.toString() !== user.id.toString()) {
      return response
        .status(403)
        .json({ error: "Unauthorized to delete this capsule!" });
    }

    await capsule.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to delete the capsule!" });
  }
});
capsulesRouter.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const fileInput = req.file ? req.file.path : null;

    const updatedCapsule = await Capsule.findByIdAndUpdate(
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
  async (request, response) => {
    try {
      const userId = request.params.userId;
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
