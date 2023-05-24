const express = require('express');
const router = express.Router();

const { getData, postData, getDataId } = require('./controller');

router.route('/').get(getData).post(postData);
router.route('/:id').get(getDataId);

module.exports = router;
