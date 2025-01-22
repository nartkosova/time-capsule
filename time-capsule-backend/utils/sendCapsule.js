const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendCapsule = async (capsule) => {

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

  const mailOptions = {
    from: 'timecapsule668@gmail.com',
    to: capsule.sendTo,
    subject: `${capsule.title}`,
    text: `
      Dear ${capsule.sendTo},
      
      Your time capsule has arrived! Here are the details:
      
      ${capsule.title}

      ${capsule.content}

      Sent on: ${capsule.dateSent}
      
      Sincerely,
      Time Capsule Team
    `,
  };
  await transporter.sendMail(mailOptions);
  console.log(`Capsule sent to ${capsule.sendTo}`);
};

module.exports = sendCapsule;
