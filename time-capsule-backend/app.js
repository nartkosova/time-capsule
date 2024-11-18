const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const capsulesRouter = require("./controllers/capsules");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const path = require("path");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message),
  );

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use(morgan("dev"));

app.use(
  "/api/capsules",
  middleware.tokenExtractor,
  middleware.userExtractor,
  capsulesRouter,
);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use((error, request, response, next) => {
  console.error(error.message);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

module.exports = app;
