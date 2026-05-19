
const mongoose = require("mongoose");

const providerkycSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,

  kyc: {
    pan: String,
    businessType: {
      type: String,
      enum: ["individual", "proprietor", "company"]
    },
    address: String,
    city: String,
    state: String,
    pincode: String,
    gst: String
  },

  bank: {
  accountNumber: String,

  ifsc: String,

  accountHolderName: String,

  upiId: String
},

  razorpayAccountId: String,

  kycStatus: {
    type: String,
    enum: ["pending", "submitted", "verified", "rejected"],
    default: "pending"
  }
});

module.exports = mongoose.model("ProviderKyc", providerkycSchema);