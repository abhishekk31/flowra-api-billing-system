const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "API",
  },
  count: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  earnings: {
  type: Number,
  default: 0
}
}, { timestamps: true });

module.exports = mongoose.model("Usage", usageSchema);