const nodemailer = require('nodemailer');
const ejs = require('ejs');
require('dotenv').config();

module.exports = {
  composeMail: async (data) => {
    console.log(data);
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.FROM,
        pass: process.env.PASS,
      },
    });
    const html = await ejs.renderFile('views/index.ejs', data);
    await transporter.sendMail({
      from: 'Asvin',
      to: data.email,
      subject: data.subject,
      html,
    });
    return html;
  },
};
