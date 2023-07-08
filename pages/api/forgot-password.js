// const nodemailer = require('nodemailer');

// const emailService = ['gmail','hotmail']; // Replace with the email service you want to use
// const email = process.env.EMAIL;
// const appPassword = process.env.EMAIL_PASS;

// console.log("emailService",emailService)

// async function sendEmail(req, res) {
//   const { recipient, subject, content } = req.body;

//   if (!email || !appPassword) {
//     return res.status(500).json({ error: 'Email credentials not found' });
//   }

//   let transporter;

//   if (emailService[0] === 'gmail') {
//     transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: email,
//         pass: appPassword,
//       },
//     });
//   } else if (emailService[1] === 'hotmail') {
//     // Configure Nodemailer for other email service
//     // Replace the options below with the specific settings for your email service
//     transporter = nodemailer.createTransport({
//       host: 'smtp-mail.outlook.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD,
//       },
//     });
//   } else {
//     return res.status(500).json({ error: 'Invalid email service' });
//   }

//   const mailOptions = {
//     from: email,
//     to: recipient,
//     subject,
//     text: content,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Failed to send email', errorMessage: error.message });
//   }
// }

// module.exports = sendEmail;
