const vaccination = require('../../models/vaccination');
const consultation = require('../../models/consultation');
const transaction = require('../../models/transaction');
const signup = require('../../models/signup');

module.exports = {
  getPatientData: async (req, res) => {
    try {
      const cosulcount = await consultation.countDocuments({
        loginId: req.user.id,
      });
      const vaccinecount = await vaccination.countDocuments({
        loginId: req.user.id,
      });
      const amount = await transaction.find({
        loginId: req.user.id,
      });

      const totalAmount = amount.reduce(
        (acc, obj) => acc + parseFloat(obj.amount),
        0
      );
      res.send({
        success: true,
        message: { cosulcount, vaccinecount, totalAmount },
      });
    } catch (e) {
      console.log(e);
      res.send({
        success: false,
        message: e.message,
      });
    }
  },
  getAdminData: async (req, res) => {
    try {
      const cosulcount = await consultation.countDocuments({});
      const vaccinecount = await vaccination.countDocuments({});
      const usercount = await signup.countDocuments({});

      res.send({
        success: true,
        message: { cosulcount, vaccinecount, usercount },
      });
    } catch (e) {
      console.log(e);
      res.send({
        success: false,
        message: e.message,
      });
    }
  },
};
