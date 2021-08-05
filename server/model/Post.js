const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

const postSchema = new MSchema({
  title: String,
  body: String,
  user: String,
});

module.exports = mongoose.model("post", postSchema);
