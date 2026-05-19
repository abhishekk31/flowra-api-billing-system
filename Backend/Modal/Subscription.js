const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  api: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "API",
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },
  usedRequests: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true
  },
  requestLimitSnapshot: Number,
priceSnapshot: Number,
durationSnapshot: Number
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);