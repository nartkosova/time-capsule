const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  try {
    console.log('Logging in...');
    const loginResponse = await axios.post('http://localhost:3003/api/login', {
      username: 'qollaku006', 
      password: 'qollaku006',
    });
    const token = loginResponse.data.token; 
    console.log('Login successful, token obtained.');

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const capsuleData = {
      title: 'Test Capsule',
      content: 'This is a test email from the sendCapsule function.',
      sendTo: 'nartkosova21@gmail.com',
      date: new Date(),
    };

    console.log('Creating test capsule via POST request...');
    const capsuleResponse = await axios.post('http://localhost:3003/api/capsules', capsuleData);

    const createdCapsule = capsuleResponse.data;
    console.log('Test capsule created:', createdCapsule);

    console.log('Email sent successfully! Check your inbox.');
  } catch (error) {
    console.error('Error during test:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
})();
