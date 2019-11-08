/**
 * This file contains all the e-mail configuration related data,Such as e-mail and phone number
 * verification through otp tempalate,Wel-come mail once successfull user signup is done and
 * kyc_status once kyc_data is submited.
 * @package mail
 * @subpackage sources\services\mailer\mail
 * @author SEPA Cyper Technologies, Sujit kumar.
 */
"use strict";

var handle = require('handlebars');
var fs = require('fs');
var transporter = nodemailer.createTransport({
  // need SMTP host to configure mail.
  host: process.env.SERVICE,
  port: process.env.MAIL_GMAIL_PORT,
  secure: false, 
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
   tls: {
        ciphers: 'SSLv3'
    }
});

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

var forgotStatus = (email, link, accountType) => {
  return new Promise(function (resolve, reject) {
    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Reset Your PayVoo Password'
    };
    readHTMLFile(__dirname + '/forgotStatus.html', function (err, html) {
      var template = handle.compile(html);
      var replacements = {
        forgotStatus: link,
        type : accountType
      };
      var htmlToSend = template(replacements);
      mailOptions.html = htmlToSend;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve({ status: 1 });
        }
      })
    })
  })
}





module.exports = {
  forgotStatus
 
}
