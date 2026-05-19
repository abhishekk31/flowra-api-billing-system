const mongoose = require("mongoose");

const withdrawalSchema =
new mongoose.Schema({

  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  upiId: {
    type: String
  },

  bankName: {
    type: String
  },

  accountNumber: {
    type: String
  },

  ifscCode: {
    type: String
  },

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected"
    ],
    default: "pending"
  }

}, { timestamps: true });

module.exports =
mongoose.model(
  "Withdrawal",
  withdrawalSchema
);