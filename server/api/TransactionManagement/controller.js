const transaction = require('../../models/transaction');

module.exports = {
  getData: async (req, res) => {
    try {
      const transactionDetails = await transaction.aggregate([
        {
          $lookup: {
            from: 'signups',
            localField: 'loginId',
            foreignField: 'loginId',
            as: 'user_details',
          },
        },
        {
          $unwind: {
            path: '$user_details',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return res.send({
        success: true,
        message: transactionDetails,
      });
    } catch (e) {
      console.log(e);
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
};
