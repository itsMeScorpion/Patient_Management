const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const consultation = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  hospital: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  doctor: {
    type:String,
    required: false,
    trim: true,
  },
  time: {
    type: String,
    required: false,
    trim: true,
  },
  loginId: {
    type: ObjectId,
    ref: 'login',
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('consultation', consultation);
