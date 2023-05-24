const express = require('express');
const router = express.Router();

const { login, signup } = require('./controller');
// const { imageUpload } = require('../../middleware/image_upload');

router.route('/login').post(login);
// .get(getData).patch(patchData);

router.route('/signup').post(signup);

module.exports = router;
