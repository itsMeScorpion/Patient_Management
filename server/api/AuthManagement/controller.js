const login = require('../../models/login');
const signup = require('../../models/signup');

const composeMail = require('../../modules/composeMail');

const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await login.findOne({ email });
      console.log(user);
      if (!user) {
        return res.send({
          success: false,
          message: 'invalid username/password',
        });
      }
      if (!(await login.verifyPassword(password, user.password, user.salt))) {
        return res.send({
          message: 'invalid username/passwords',
        });
      }
      const accessToken = await login.generateAuthTocken(user);
      const refreshTocken = await login.generateAuthTocken(user);
      user.accessToken = accessToken;
      const role = await signup.findOne({ loginId: user._id });

      return res.send({
        success: true,
        message: 'Login successfully',
        data: {
          role: role.role,
          accessToken,
          refreshTocken,
        },
      });
    } catch (e) {
      console.log(e);
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
  signup: async (req, res) => {
    console.log('data', req.body);
    try {
      const salt = await login.generateSalt();
      req.body.password = await login.hashPassword(req.body.password, salt);
      req.body.salt = salt;
      console.log('req.body', req.body);

      const loginDetails = await login.create({
        email: req.body.email,
        password: req.body.password,
        salt: req.body.salt,
      });

      await signup.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dob: req.body.dob,
        address: req.body.address,
        aadharNo: req.body.aadharNo,
        country: req.body.country,
        state: req.body.state,
        password: req.body.password,
        role: 'Patient',
        salt: req.body.salt,
        loginId: loginDetails.id,
      });

      //sign-up email
      await composeMail.composeMail({
        email: req.body.email,
        name: req.body.name,
        subject: 'Confirm Sign UP',
        content: `${req.body.name} have successfully signed up`,
      });

      return res.json({
        success: true,
        message: 'created successfully',
      });
    } catch (e) {
      return res.send({
        success: false,
        message: e.message,
      });
    }
  },
};
