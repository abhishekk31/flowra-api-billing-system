const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["admin", "user", "payment", "api"],
    default: "admin"
  }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);