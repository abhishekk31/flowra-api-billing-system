const API=require('../Modal/apimodal.js')
const Subscription= require('../Modal/Subscription.js');
const Transaction= require('../Modal/TransectionModel.js');
const Plan=require('../Modal/PlanModal.js')



exports.updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    const subs = await Subscription.countDocuments({ plan: planId });

    if (subs > 0) {
      return res.status(400).json({
        message: "Cannot edit plan. Users already subscribed."
      });
    }

    const updated = await Plan.findByIdAndUpdate(
      planId,
      req.body,
      { new: true }
    );

    res.json({
      message: "Plan updated",
      plan: updated
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};