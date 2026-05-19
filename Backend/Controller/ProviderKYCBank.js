const ProviderKyc =
require("../Modal/ProviderKYCmodal");

exports.getProviderBank =
async (req, res) => {

  try {

    const kyc =
      await ProviderKyc.findOne({

        email:
          req.user.email
      });

    res.json(kyc);

  } catch (err) {

    res.status(500).json({
      message:
        err.message
    });
  }
};

exports.updateProviderBank =
async (req, res) => {

  try {

    const {

      accountNumber,
      ifsc,
      accountHolderName,
      upiId

    } = req.body;

    let kyc =
      await ProviderKyc.findOne({

        email:
          req.user.email
      });

    if (!kyc) {

      kyc =
        new ProviderKyc({

          email:
            req.user.email
        });
    }

    kyc.bank = {

      accountNumber,
      ifsc,
      accountHolderName,
      upiId
    };

    await kyc.save();

    res.json({

      success: true,

      message:
        "Bank details updated"
    });

  } catch (err) {

    res.status(500).json({

      message:
        err.message
    });
  }
};