const User = require('../Modal/modal.js')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const API = require("../Modal/apimodal.js");
const crypto = require("crypto");
const Plan=require('../Modal/PlanModal.js')

//user-register-function
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin cannot be created from public route"
      });
    }


    const allowedRoles = ["consumer", "provider"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const emailClean = email.trim().toLowerCase();

    const userExists = await User.findOne({ email: emailClean });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const apiKey = crypto.randomBytes(20).toString("hex");

    const user = await User.create({
      name,
      email: emailClean,
      password: hashpassword,
      role: role || "consumer",
      apiKey
    });

    const { password: userpass, ...userdata } = user._doc;

    res.status(201).json({
      message: 'User registered successfully',
      userdata
    });

  } catch (error) {
    res.status(500).json({
      Error: error.message
    });
  }
};


//login-function

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

const emailClean = email.trim().toLowerCase();

const user = await User.findOne({ email: emailClean });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    if (user.isBlocked) {
  return res.status(403).json({
    msg: "Your account is blocked by admin"
  });
}
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    //jwt-token-gen-user-is-vaild
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
    const { password: hashPassword, ...userdata } = user._doc
    res.status(201).json({
      message: 'login-successfully',
      token,
      user: userdata
    })

  }
  catch (error) {
    res.status(500).json({
      Error: error.message
    })
  }
}

//api-controller


// Create API
exports.createAPI = async (req, res) => {

  try {

    const {
      name,
      description,
      endpoint,
      externalUrl,
      method,
      freeLimit
    } = req.body;

    // Required fields
    if (
      !name ||
      !endpoint ||
      !externalUrl ||
      !method
    ) {
      return res.status(400).json({
        message:
        "All required fields must be provided"
      });
    }

    // Normalize endpoint
    const normalizedEndpoint =
      endpoint.trim().toLowerCase();

    // Check duplicate endpoint
    const existing =
      await API.findOne({
        endpoint: normalizedEndpoint
      });

    if (existing) {

      return res.status(400).json({
        message:
        "Endpoint already exists"
      });
    }

    // Create API
    const api = await API.create({

      name,

      description,

      endpoint: normalizedEndpoint,

      externalUrl,

      method,

      price: 0,

      freeLimit: freeLimit || 0,

      owner: req.user.id,
    });

    res.status(201).json({

      message:
      "API created successfully",

      api,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get-all-APIs

exports.getAllAPIs = async (req, res) => {
  try {
    // Only active APIs
    const apis = await API.find({ isActive: true })
      .populate("owner", "name email");

    // Get all plans for these APIs
    const apiIds = apis.map(api => api._id);

    const plans = await Plan.find({
      api: { $in: apiIds }
    });

    // Attach plans to each API
    const result = apis.map(api => ({
      ...api.toObject(),
      plans: plans.filter(
        p => p.api.toString() === api._id.toString()
      )
    }));

    
    res.status(200).json({
      apis: result
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//checking-provider
exports.isProvider = (req, res, next) => {
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Only providers allowed" });
  }
  next();
};



