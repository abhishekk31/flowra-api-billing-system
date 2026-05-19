const Subscription = require("../Modal/Subscription.js");

exports.getUsageAnalytics = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user._id })
      .populate("api", "name");

    const result = subs.map(sub => ({
      apiName: sub.api?.name,
      used: sub.usedRequests,
      limit: sub.requestLimitSnapshot || 0
    }));

    res.json({ usage: result });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};