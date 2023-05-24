const login = require('../models/login');
exports.passwordHashing = async (password) => {
  const salt = await login.generateSalt();
  let newPassword = await login.hashPassword(password, salt);
  return { salt, newPassword };
};
