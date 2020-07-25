const express = require("express");
const blogRoute = express.Router();

// Blog model
let Blog = require("../model/Blog");

// Add Blog
blogRoute.route("/add-blog").post((req, res, next) => {
  console.log("post new blog");
  Blog.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all blog
blogRoute.route("/").get((req, res) => {
  console.log("get blogs");
  Blog.find((error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = blogRoute;
