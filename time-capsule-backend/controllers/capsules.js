const capsulesRouter = require("express").Router();
const capsule = require("../models/capsule");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

capsulesRouter.get("/", async (request, response) => {
  try {
    const capsules = await capsule
      .find({})
      .populate("user", { username: 1, name: 1, id: 1 });
    response.json(capsules);
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
});

capsulesRouter.get("/:id", async (request, response, next) => {
  try {
    const capsule = await capsule.findById(request.params.id);
    if (capsule) {
      response.json(capsule);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});
capsulesRouter.post("/", async (request, response) => {
  try {
    const body = request.body;
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "User not found!" });
    }

    if (!body.title || !body.content || !body.date) {
      return response
        .status(400)
        .json({ error: "Title, Content, or Date missing!" });
    }

    const newCapsule = new capsule({
      title: body.title,
      content: body.content,
      date: body.date,
      fileInput: {
        data: body.buffer,
        contentType: body.mimetype,
      },
      user: user._id,
    });
    const savedcapsule = await newCapsule.save();
    user.capsules = user.capsules.concat(savedcapsule._id);
    await user.save();
    response.status(201).json(savedcapsule);
  } catch (error) {
    console.error("Failed to save capsule", error);
    response.status(500).json({ error: "Failed to save the capsule!" });
  }
});
capsulesRouter.delete("/:id", async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
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
capsulesRouter.put("/:id", async (request, response) => {
  try {
    const { title, content, date, fileInput } = request.body;
    const updatedCapsule = await capsule
      .findByIdAndUpdate(
        request.params.id,
        { title, content, date, fileInput },
        { new: true, runValidators: true },
      )
      .populate("user", { username: 1, name: 1, id: 1 });

    if (updatedCapsule) {
      response.json(updatedCapsule);
    } else {
      response.status(404).json({ error: "Capsule not found!" });
    }
  } catch (error) {
    console.error("kaka", error);
    response.status(400).json({ error: "Bad Request" });
  }
});
capsulesRouter.get("/user/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const userCapsules = await capsule
      .find({ user: userId })
      .populate("user", { username: 1, name: 1, id: 1 });
    response.json(userCapsules);
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
});
capsulesRouter.get("/file/:id", async (request, response) => {
  try {
    const capsule = await capsule.findById(request.params.id);
    if (!capsule || !capsule.fileInput) {
      return response.status(404).json({ error: "File not found!" });
    } else {
      response.set("Content-Type", capsule.fileInput.contentType);
      response.send(capsule.fileInput.data);
    }
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = capsulesRouter;
