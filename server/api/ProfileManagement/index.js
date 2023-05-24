const express = require('express');
const router = express.Router();

const { getData, editData } = require('./controller');
// const { imageUpload } = require('../../middleware/image_upload');

router.route('/').get(getData).patch(editData);
// .get(getData).patch(patchData);

module.exports = router;
