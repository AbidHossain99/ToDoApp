const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
  list: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("list", todoListSchema);
