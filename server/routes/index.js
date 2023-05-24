var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/contact-us', require('../api/ContactUsManagement/index'));
router.use('/auth', require('../api/AuthManagement/index'));
router.use('/profile', require('../api/ProfileManagement/index'));
router.use('/consultation', require('../api/ConsultationManagement/index'));
router.use('/vaccination', require('../api/vaccineManagement/index'));
router.use('/certificate', require('../api/CertificateManagement/index'));
router.use(
  '/transaction-history',
  require('../api/TransactionManagement/index')
);
router.use('/dashboard', require('../api/CounterManagement/index'));

module.exports = router;
