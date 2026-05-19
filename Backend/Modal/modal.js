const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["provider", "consumer", "admin"],
    default: "consumer"
  },
  apiKey: {
  type: String,
  unique: true,
},
credits: {
  type: Number,
  default: 100
},
wallet: {
  totalEarned: {
    type: Number,
    default: 0
  },

  pending: {
    type: Number,
    default: 0
  },

  withdrawn: {
    type: Number,
    default: 0
  }
},
isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);