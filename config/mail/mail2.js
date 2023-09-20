const nodemailer = require('nodemailer');

const sendReportMail = async (student_id, email_address) => {
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
        ciphers: 'SSLv3',
      },
    });

    const mailOptions = {
      from: process.env.MAIL_CLIENT_USER,
      to: [email_address],
      subject: 'FrebbyTech Consult',
      text: 'Terminal Report',
      html: '<h1></h1>',
      attachments: [
        {
          filename: `${student_id}.webp`,
          path: `./views/${student_id}.webp`,
        },
      ],
    };

    const mailResult = await transportMail.sendMail(mailOptions);
    return mailResult;
  } catch (error) {
    // throw error.message;
    console.log(error.message);
  }
};

module.exports = {
  sendReportMail,
};
