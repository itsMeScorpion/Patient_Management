const express = require('express');
const router = express.Router();

const { postData, getData } = require('./controller');

router.route('/').get(getData).post(postData);

module.exports = router;
