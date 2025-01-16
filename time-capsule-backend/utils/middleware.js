const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  next(error);
};
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.substring(7);
    console.log("Request Token:", request.token);
  } else {
    request.token = null;
    console.error("Token missing from Authorization header!");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      console.log('Decoded Token:', decodedToken);

      if (!decodedToken.id) {
        return response.status(401).json({ error: "Token invalid: no user ID." });
      }

      const user = await User.findById(decodedToken.id);
      console.log("Fetched User:", user);

      if (!user) {
        return response.status(404).json({ error: "User not found!" });
      }

      request.user = user;
      next();
      
      console.log("Request User:", request.user);
    } catch (error) {
      console.error("Token verification failed:", error);
      return response.status(401).json({ error: "Unauthorized access!" });
    }
  }
};

const authorizeAdmin = (req, res, next) => {
  console.log("Authorize Admin - Request User:", req.user);
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied! Admins only." });
  }
  next();
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  authorizeAdmin,
};
