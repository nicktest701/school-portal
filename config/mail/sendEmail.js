const nodemailer = require('nodemailer');

const sendEMail = async (email_address, message) => {
  try {
    const transportMail = nodemailer.createTransport({
      service: process.env.MAIL_CLIENT_SERVICE,
      auth: {
        user: process.env.MAIL_CLIENT_USER,
        pass: process.env.MAIL_CLIENT_PASS,
      },
      port: 465,
      secure: true,
      from: process.env.MAIL_CLIENT_USER,
      tls: {
        rejectUnauthorized: false,
      },
    });

    // verify connection configuration
    transportMail.verify(function (error, success) {
      if (error) {
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mailOptions = {
      from: `FrebbyTech School Portal ${process.env.MAIL_CLIENT_USER}`,
      sender: process.env.MAIL_CLIENT_USER,
      to: [email_address],
      subject: 'FrebbyTech School Portal',
      text: '',
      html: message,
    };

    const mailResult = await transportMail.sendMail(mailOptions);

    return mailResult;
  } catch (error) {
    console.log(error.message);
    // throw error.message;
  }
};

module.exports = sendEMail;
