const jwt = require('jsonwebtoken');
const users = require('../models/login');

module.exports = async (req, res, next) => {
  try {
    if (
      req.originalUrl.startsWith('/auth')
      // ||
      // req.originalUrl.startsWith('/company') ||
      // req.originalUrl.startsWith('/eventlist')
    )
      return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    if (!token) {
      return res.json({
        success: false,
        message: 'Unauthorized Access',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded ---> \n', decoded);
    if (!decoded) {
      return res.json({
        success: false,
        msg: 'Invalid Token',
      });
    }
    if (decoded.exp < Date.now()) {
      return res.json({ success: false, msg: 'Token Expired' });
    }

    const isUserExists = await users.findById(decoded.id);
    if (!isUserExists) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    let matchvalidity = isUserExists.password
      .concat(isUserExists._id)
      .concat(isUserExists.email);
    if (matchvalidity != decoded.validity) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    req.user = decoded;
    return next();
  } catch (ex) {
    console.log(ex);
    return res.json({ success: false, msg: 'Invalid Token' });
  }
};
