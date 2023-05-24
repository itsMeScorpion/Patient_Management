const express = require('express');
const router = express.Router();

const { postData, getData } = require('./controller');
// const { imageUpload } = require('../../middleware/image_upload');

router.route('/').post(postData).get(getData);
// .get(getData).patch(patchData);

module.exports = router;
