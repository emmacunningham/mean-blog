const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
const Blog = new Schema(
  {
    blog_name: {
      type: String,
    },
    blog_title: {
      type: String,
    },
    blog_author: {
      type: String,
    },
  },
  {
    collection: "blogs",
  }
);

module.exports = mongoose.model("Blog", Blog);
