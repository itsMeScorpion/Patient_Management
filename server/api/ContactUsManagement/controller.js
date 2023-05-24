const contact = require('../../models/contact');
const composeMail = require('../../modules/composeMail');

module.exports = {
  postData: async (req, res) => {
    try {
      console.log('data', req.body);
      // req.body.status = 'unread';
      await contact.create(req.body);

      // composeMail
      await composeMail.composeMail({
        name: req.body.name,
        email: req.body.email,
        subject: 'Enquiry Received',
        content: `${req.body.name}, your response has been noted. You will be contacted soon`,
      });

      res.send({
        success: true,
        message:
          'Thanks for the Enquiry, our Representatives will contact you soon!',
      });
    } catch (e) {
      res.send({
        success: false,
        message: e.message,
      });
    }
  },
  getData: async (req, res) => {
    try {
      const contactData = await contact.find({});
      return res.send({
        success: true,
        message: contactData,
      });
    } catch (e) {
      res.send({
        success: false,
        message: e.message,
      });
    }
  },
};
