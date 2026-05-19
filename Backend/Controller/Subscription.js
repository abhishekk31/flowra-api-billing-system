const Subscription =
require("../Modal/Subscription.js");

const Plan =
require("../Modal/PlanModal.js");


// ─────────────────────────────────────────────
// SUBSCRIBE PLAN
// ─────────────────────────────────────────────

exports.subscribe = async (req, res) => {

  try {

    const { planId } = req.body;

    const plan =
      await Plan.findById(planId);

    if (!plan) {

      return res.status(404).json({
        message: "Plan not found"
      });
    }

    // Existing subscription check
    const existingSub =
      await Subscription.findOne({

        user: req.user._id,

        api: plan.api
      });

    if (existingSub) {

      return res.status(400).json({
        message:
          "Already subscribed. Use upgrade plan."
      });
    }

    // Expiry
    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() +
      plan.duration
    );

    // Create subscription
    const sub =
      await Subscription.create({

        user: req.user._id,

        api: plan.api,

        plan: plan._id,

        requestLimitSnapshot:
          plan.requestLimit,

        priceSnapshot:
          plan.price,

        durationSnapshot:
          plan.duration,

        expiresAt
      });

    res.status(201).json({

      success: true,

      message:
        "Subscribed successfully",

      subscription: sub
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ─────────────────────────────────────────────
// UPGRADE PLAN
// ─────────────────────────────────────────────

exports.upgradePlan = async (req, res) => {

  try {

    const { planId } = req.body;

    const userId = req.user._id;

    const newPlan =
      await Plan.findById(planId);

    if (!newPlan) {

      return res.status(404).json({
        message: "Plan not found"
      });
    }

    const sub =
      await Subscription.findOne({

        user: userId,

        api: newPlan.api
      });

    if (!sub) {

      return res.status(404).json({
        message:
          "No existing subscription"
      });
    }

    // Update subscription
    sub.plan = newPlan._id;

    sub.usedRequests = 0;

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() +
      newPlan.duration
    );

    sub.expiresAt = expiresAt;

    sub.requestLimitSnapshot =
      newPlan.requestLimit;

    sub.priceSnapshot =
      newPlan.price;

    sub.durationSnapshot =
      newPlan.duration;

    await sub.save();

    res.json({

      success: true,

      message:
        "Plan upgraded successfully",

      subscription: sub
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};