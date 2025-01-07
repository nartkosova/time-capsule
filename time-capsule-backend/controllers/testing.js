const router = require("express").Router();
const Capsule = require("../models/capsule");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await Capsule.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
