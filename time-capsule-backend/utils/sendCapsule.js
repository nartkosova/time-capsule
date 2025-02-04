const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
function truncateContent(content, wordLimit) {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}
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
      html: `
<p>Dear ${capsule.sendTo},</p>
        
<p>You have been sent a <strong>Time Capsule!</strong></p>
        
<p><strong>${capsule.title}</strong></p>
<p>${truncateContent(capsule.content, 10)}</p> 
        
<p>To view the full Time Capsule, create an account to access your Time Capsule.</p>

<p>Visit the <a href="https://time-capsule-2.onrender.com/">Time Capsule</a> website to sign up and access your Time Capsule.</p>
        
<p>Sent on: ${capsule.dateSent} </p>
        
<p>Sincerely,<br/>Time Capsule Team</p>
      `,
    };
  await transporter.sendMail(mailOptions);
  console.log(`Capsule sent to ${capsule.sendTo}`);
};

module.exports = sendCapsule;
