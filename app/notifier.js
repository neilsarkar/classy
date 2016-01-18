var nodemailer = require('nodemailer');
var auth       = require('./email_auth');
var debug      = require('debug')('classy');
var _          = require('lodash');

debug('Using auth', auth);

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: auth
});

var defaultOptions = {
  from: auth.user,
  subject: 'New UCB Classes Posted',
  text: 'Hi',
  to: 'nobody@gmail.com'
}

module.exports.sendMail = function(mailOptions, cb) {
  mailOptions = _.extend(defaultOptions, mailOptions);

  transporter.sendMail(mailOptions, cb);
}
