const Plan = require("../Modal/PlanModal.js");
const API = require("../Modal/apimodal.js");

exports.createPlan = async (req, res) => {
  try {
    const { api, name, price, requestLimit, duration } = req.body;

    const foundApi = await API.findById(api);

if (!foundApi) {
  return res.status(404).json({ message: "API not found" });
}

if (foundApi.owner.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not authorized" });
}

const plan = await Plan.create({
  api,
  name,
  price,
  requestLimit,
  duration
});

    res.status(201).json({
      message: "Plan created successfully",
      plan
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};