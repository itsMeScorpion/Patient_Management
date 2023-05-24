const express = require('express');
const router = express.Router();

const {
  getVaccinationData,
  getConsultationData,
  consultationCertificate,
  vaccinationCertificate,
} = require('./controller');

router.route('/consultation').get(getConsultationData);
router.route('/vaccination').get(getVaccinationData);
router.route('/getConsultationCertificate').post(consultationCertificate);
router.route('/getVaccinationCertificate').post(vaccinationCertificate);

module.exports = router;
