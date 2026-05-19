const User = require("../Modal/modal");
const API = require("../Modal/apimodal");
const Plan = require("../Modal/PlanModal"); // use your actual file name
const Transaction = require("../Modal/TransectionModel");

// GET /admin/providers
exports.getAllProviders = async (req, res) => {
  try {
    // all providers
    const providers = await User.find({ role: "provider" })
      .select("name email isBlocked createdAt")
      .lean();

    // attach APIs, plans, earnings
    const result = await Promise.all(
      providers.map(async (p) => {
        const apis = await API.find({ owner: p._id })
          .select("name price isActive")
          .lean();

        const plans = await Plan.find({ provider: p._id })
          .select("name price")
          .lean();

        const earningsAgg = await Transaction.aggregate([
          {
            $lookup: {
              from: "apis",
              localField: "api",
              foreignField: "_id",
              as: "apiDoc"
            }
          },
          { $unwind: "$apiDoc" },
          { $match: { "apiDoc.owner": p._id } },
          {
            $group: {
              _id: null,
              total: { $sum: "$providerEarning" }
            }
          }
        ]);

        const earnings = earningsAgg[0]?.total || 0;

        return {
          ...p,
          apis,
          plans,
          earnings
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};