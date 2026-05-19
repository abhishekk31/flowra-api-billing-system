const Usage = require("../Modal/usageModal.js");
const API = require("../Modal/apimodal.js");
const Subscription = require("../Modal/Subscription.js");

exports.trackUsage = async (req, res, next) => {
  try {
    const { endpoint } = req.params;
    const user = req.user;

    const api = await API.findOne({
      endpoint: endpoint.trim().toLowerCase()
    });

    if (!api) {
      return res.status(404).json({
        message: "API not found"
      });
    }

    // 🔥 find subscription
    const sub = await Subscription.findOne({
      user: user._id,
      api: api._id
    }).populate("plan");

    if (!sub) {
      return res.status(403).json({
        message: "No active subscription"
      });
    }

    // 🔥 check expiry
    if (new Date() > sub.expiresAt) {
      return res.status(403).json({
        message: "Subscription expired"
      });
    }

    // 🔥 check limit
    if (sub.usedRequests >= sub.plan.requestLimit) {
      return res.status(403).json({
        message: "Request limit exceeded Please upgrade your plan."
      });
    }

    // ✅ increase usage
    sub.usedRequests += 1;
    await sub.save();

    req.api = api;

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};




exports.getUsage = async (req, res) => {
  try {
    const userId = req.user._id;

    const subs = await Subscription.find({ user: userId })
      .populate("api", "name endpoint")
      .populate("plan", "name requestLimit price");

    const result = subs.map(sub => ({
      apiName: sub.api.name,
      endpoint: sub.api.endpoint,
      planName: sub.plan.name,
      totalLimit: sub.plan.requestLimit,
      usedRequests: sub.usedRequests,
      remainingRequests: sub.plan.requestLimit - sub.usedRequests,
      expiresAt: sub.expiresAt
    }));

    res.json({
      usage: result
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};