const API=require('../Modal/apimodal.js')
const Subscription= require('../Modal/Subscription.js');
const Transaction= require('../Modal/TransectionModel.js');
const Plan=require('../Modal/PlanModal.js')



exports.getProviderApis = async (req, res) => {
  try {
    const apis = await API.find({ owner: req.user._id });

    const result = await Promise.all(
      apis.map(async (api) => {

        const plans = await Plan.find({
          api: api._id
        });

        return {
          ...api.toObject(),
          plans
        };
      })
    );

    res.json({
      apis: result
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};