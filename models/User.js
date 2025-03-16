const mongoose = require("mongoose");

// Define Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true }, // Ajout de lowercase
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
});


// Export Model
module.exports = mongoose.model("User", userSchema);
