const User = require("../Modal/modal.js");
const Subscription = require("../Modal/Subscription.js");

exports.getAllConsumers = async (req, res) => {
  try {
    const consumers = await User.find({ role: "consumer" })
      .select("name email isBlocked")
      .lean();

    const result = await Promise.all(
      consumers.map(async (c) => {
        const subs = await Subscription.find({ user: c._id })
          .populate({
            path: "api",
            select: "name owner"
          })
          .populate("plan", "name")
          .lean();

        return {
          ...c,
          subscriptions: subs
        };
      })
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};