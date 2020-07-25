const express = require("express");
const blogRoute = express.Router();

// Blog model
let Blog = require("../model/Blog");

// Add Blog
blogRoute.route("/add-blog").post((req, res, next) => {
  Blog.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all blog
blogRoute.route("/").get((req, res) => {
  Blog.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = blogRoute;
