const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // put your email here
      pass: ''  // put your password of email id
    }
  });

exports.transporter = transporter;