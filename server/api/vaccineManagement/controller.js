const vaccination = require('../../models/vaccination');
const hospital = require('../../models/hospital');
const vaccine = require('../../models/vaccine');
const transaction = require('../../models/transaction');
const Web3 = require('web3');

module.exports = {
  getData: async (req, res) => {
    try {
      const vaccineData = await vaccine.find({});
      const hospitalData = await hospital.find({});
      return res.send({
        success: true,
        message: { vaccineData, hospitalData },
      });
    } catch (e) {
      console.log(e.message);
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  postData: async (req, res) => {
    try {
      console.log('body', req.body);
      const { values, result } = req.body;

      let hospitalData = await hospital.findOne({
        _id: values.hospital,
      });
      let vaccineList = await vaccine.findOne({
        _id: values.vaccine,
      });
      let transactionDetails = new transaction({
        amount: '0.01',
        status: result.status,
        appointmentType: 'vaccination',
        transactionHash: result.transactionHash,
        loginId: req.user.id,
      });
      const trans = await transaction.create(transactionDetails);

      values.hospital = hospitalData._id;
      values.vaccine = vaccineList._id;
      values.loginId = req.user.id;
      values.date = new Date(values.date).setHours(0, 0, 0, 0);
      let vaccineData = new vaccination({
        vaccineId: values.vaccine,
        hospitalId: values.hospital,
        date: values.date,
        time: values.time,
        loginId: req.user.id,
      });
      const vaccines = await vaccination.create(vaccineData);
      console.log(trans, vaccines);
      return res.send({
        success: true,
        message: 'Transaction Completed and Your Booking has been Confirmed',
      });
    } catch (e) {
      console.log(e.message);
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
};
