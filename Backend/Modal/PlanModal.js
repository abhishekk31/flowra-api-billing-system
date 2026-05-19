const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "API",
    required: true
  },
  name: {
    type: String,
    required: true // Free, Basic, Pro
  },
  price: {
    type: Number,
    required: true // ₹
  },
  requestLimit: {
    type: Number,
    required: true // monthly limit
  },
  duration: {
    type: Number,
    default: 30 // days
  }
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);