const API =
require('../Modal/apimodal.js');

const Subscription =
require('../Modal/Subscription.js');

const Transaction =
require('../Modal/TransectionModel.js');

const User =
require('../Modal/modal.js');

exports.getProviderDashboard =
async (req, res) => {

  try {

    const providerId =
      req.user._id;

    // Provider details
    const provider =
      await User.findById(
        providerId
      );

    // Total APIs
    const totalApis =
      await API.countDocuments({
        owner: providerId
      });

    // Get provider APIs
    const apis =
      await API.find({
        owner: providerId
      });

    const apiIds =
      apis.map(api => api._id);

    // Subscribers
    const totalSubscribers =
      await Subscription.countDocuments({
        api: { $in: apiIds }
      });

    // SUCCESSFUL transactions only
    const successfulPayments =
      await Transaction.countDocuments({

        api: { $in: apiIds },

        status: "success"
      });

    // Final response
    res.json({

      totalApis,

      totalSubscribers,

      successfulPayments,

      totalEarnings:
        provider.wallet.totalEarned,

      wallet:
        provider.wallet
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};