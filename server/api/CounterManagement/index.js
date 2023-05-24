const express = require('express');
const router = express.Router();

const { getPatientData, getAdminData } = require('./controller');

router.route('/patient').get(getPatientData);
router.route('/admin').get(getAdminData);

module.exports = router;
