const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harshit.17bece079@gmail.com', // put your email here
      pass: 'qcazzcestkennwvt'  // put your password of email id
    }
  });

exports.transporter = transporter;