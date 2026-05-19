const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  endpoint: {
    type: String,
    required: true,
  },
   externalUrl: {
    type: String,
    required: true,
    
  },
   method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE"],
    default: "GET",
  },
  price: {
  type: Number,
  default: 0,
  min: [0, "Price cannot be negative"],
  validate: {
    validator: Number.isInteger,
    message: "Price must be a whole number"
  }
},
  freeLimit: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("API", apiSchema);