const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
const Blog = new Schema(
  {
    blog_content: {
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
