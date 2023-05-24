const hospitalData = require('../../models/hospital');
const departmentData = require('../../models/department');
const doctorData = require('../../models/doctor');
const consultation = require('../../models/consultation');
const transaction = require('../../models/transaction');
const mongoose = require('mongoose');

module.exports = {
  postData: async (req, res) => {
    try {
      console.log('body', req.body);
      let { formData, result } = req.body;

      let hospital = await hospitalData.findOne({
        hospitalId: formData.hospitalId,
      });
      console.log('hospital', hospital);
      let department = await departmentData.findOne({
        departmentId: formData.departmentId,
      });
      console.log('department', department);
      let transactionDetails = new transaction({
        amount: '0.01',
        status: result.status,
        appointmentType: 'consultation',
        transactionHash: result.transactionHash,
        loginId: req.user.id,
      });

      const trans = await transaction.create(transactionDetails);
      formData.date = new Date(formData.date).setHours(0, 0, 0, 0);

      const newConsult = new consultation({
        hospital: formData.hospital,
        department: formData.department,
        loginId: req.user.id,
        date: formData.date,
        status: 'pending',
        transactionId: trans._id,
        time: formData.time,
        doctor: formData.doctor,
      });
      const consult = await consultation.create(newConsult);
      console.log(trans, consult);

      return res.send({
        success: true,
        message: 'The Transaction successfully Completed, Consultation Booked',
      });
    } catch (e) {
      console.log(e);
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  getData: async (req, res) => {
    try {
      const hospital = await hospitalData.find({});
      const department = await departmentData.find({});
      const doctor = await doctorData.aggregate([
        {
          $lookup: {
            from: 'departments',
            localField: 'departmentId',
            foreignField: 'departmentId',
            as: 'department_details',
          },
        },
        {
          $lookup: {
            from: 'hospitals',
            localField: 'hospitalId',
            foreignField: 'hospitalId',
            as: 'hospital_details',
          },
        },
      ]);
      return res.send({
        success: true,
        message: { hospital, department, doctor },
      });
    } catch (e) {
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  getDataId: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await consultation.aggregate([
        {
          $lookup: {
            from: 'hospitals',
            localField: 'hospitalId',
            foreignField: '_id',
            as: 'hospital_details',
          },
        },
        {
          $unwind: {
            path: '$hospital_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'departments',
            localField: 'departmentId',
            foreignField: '_id',
            as: 'department_details',
          },
        },
        {
          $unwind: {
            path: '$department_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctorId',
            foreignField: '_id',
            as: 'doctor_details',
          },
        },
        {
          $unwind: {
            path: '$doctor_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'signups',
            localField: 'loginId',
            foreignField: 'loginId',
            as: 'login_details',
          },
        },
        {
          $unwind: {
            path: '$login_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
      ]);
      // console.log(data);
      res.send({
        success: true,
        message: data,
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
