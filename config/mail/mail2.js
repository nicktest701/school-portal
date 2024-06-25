const nodemailer = require('nodemailer');

const sendReportMail = async ({ email, fullName, id }) => {
  try {
    const transportMail = nodemailer.createTransport({
      service: process.env.MAIL_CLIENT_SERVICE,
      auth: {
        user: process.env.MAIL_CLIENT_USER,
        pass: process.env.MAIL_CLIENT_PASS,
      },
      // port: 465,
      // secure: true,
      from: process.env.MAIL_CLIENT_USER,
      tls: {
        rejectUnauthorized: false,
        // ciphers: 'SSLv3',
      },
    });

    const mailOptions = {
      from: `FrebbyTech School Portal ${process.env.MAIL_CLIENT_USER}`,
      sender: process.env.MAIL_CLIENT_USER,
      to: [email],
      subject:
        'Your Results Are Now Available',
      text: 'Terminal Report',
      html: `<div>
      <h5>Dear ${fullName},</h5>
<p>We hope this message finds you well. We are excited to inform you that your results for the recent exams have been released and are now available for viewing. </p>
<p>Congratulations to all of you for your hard work and dedication during this semester. We wish you continued success in your academic journey.</p>
<p>If you have any questions or encounter any issues while accessing your results, please don't hesitate to contact our support team at [Support Email] or [Support Phone Number]. We are here to assist you.</p> 
      
      </div>`,
      attachments: [
        {
          filename: `${id}.pdf`,
          path: `./reports/${id}.pdf`,
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
