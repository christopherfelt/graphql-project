const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

const hobbySchema = new MSchema({
  title: String,
  description: String,
  user: String,
});

module.exports = mongoose.model("hobby", hobbySchema);
