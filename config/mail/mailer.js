const nodemailer = require('nodemailer');

const sendMail = async (body, emailList) => {
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
      },
    });

    // verify connection configuration
    transportMail.verify(function (error, success) {
      if (error) {
        console.log('Err is', error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mailOptions = {
      from: `FrebbyTech School Portal ${process.env.MAIL_CLIENT_USER}`,
      sender: process.env.MAIL_CLIENT_USER,
      to: emailList,
      subject: body?.title,
      text: 'FrebbyTech School Portal',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>

      html{
        font-family:'Inter',sans-serif !important;
        font-size:15px;
      } 
      </style>
  </head>
      <body style='font-family:"Inter",sans-serif;background-color:whitesmoke;padding:20px;color:#333;'>
     <h3 style="text-decoration:underline;font-weight:bold;">${body?.title}</h3>
      <div>${body?.message}</div>
      </body>
      </html>
      
      `,
    };

    await transportMail.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    // throw new Error("Error sending message.Try again later");
  }
};

module.exports = sendMail;
