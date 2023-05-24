const signup = require('../../models/signup');
const login = require('../../models/login');
const medicaldetails = require('../../models/medicalDetails');
const diseases = require('../../models/diseases');

module.exports = {
  getData: async (req, res) => {
    try {
      const userData = await signup.findOne({ email: req.user.email });
      const diseaseData = await diseases.find({});
      const medicalData = await medicaldetails.findOne({
        loginId: req.user.id,
      });
      return res.send({
        success: true,
        message: userData,
        data: { diseaseData, medicalData },
      });
    } catch (e) {
      console.log(e.message);
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  editData: async (req, res) => {
    try {
      console.log(req.body);
      userData = await login.findById(req.user.id);
      const existingData = await medicaldetails.findOne({
        loginId: req.user.id,
      });
      if (!existingData) {
        const data = await medicaldetails.create({ loginId: req.user.id });
        if (req.body.diseaseName) {
          await medicaldetails.findByIdAndUpdate(
            data._id,
            { $push: { diseases: req.body } },
            { new: true }
          );
        } else {
          await medicaldetails.findByIdAndUpdate(data._id, req.body);
        }
      } else {
        if (req.body.diseaseName) {
          await medicaldetails.findByIdAndUpdate(
            existingData._id,
            { $push: { diseases: req.body } },
            { new: true }
          );
        } else {
          await medicaldetails.findByIdAndUpdate(existingData._id, req.body);
        }
      }
      return res.send({
        success: true,
        message: 'The data has been updated successfully',
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
