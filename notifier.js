var nodemailer = require('nodemailer');
var auth       = require('./email_auth');
var lodash     = require('lodash');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: auth
});

var defaultOptions = {
  from: auth.user,
  subject: 'Hello World',
  text: 'Hi',
  to: 'nobody@gmail.com'
}

module.exports.sendMail = function(mailOptions, cb) {
  mailOptions = _.extend(defaultOptions, mailOptions);

  transporter.sendMail(mailOptions, cb);
}
