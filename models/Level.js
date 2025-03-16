const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  level: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Level", LevelSchema);
