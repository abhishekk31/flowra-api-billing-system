const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true
  },
  providerEarning: {
    type: Number,
    required: true
  },
  platformEarning: {
    type: Number,
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },


  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },

  //(for Razorpay tracking)
  razorpayOrderId: String,
  razorpayPaymentId: String

}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);