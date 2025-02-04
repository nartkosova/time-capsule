const cron = require('node-cron');
const Capsule = require('../models/capsule');
const sendCapsule = require('./sendCapsule');
const moment = require('moment');

cron.schedule('0 * * * *', async () => {
  console.log('Cron job started:', new Date());
  try {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    const capsulesToSend = await Capsule.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      sent: false,
    });

    console.log(`Capsules to send today: ${capsulesToSend.length}`);

    for (const capsule of capsulesToSend) {
      try {
        console.log('Sending capsule:', capsule.id);
        await sendCapsule(capsule);
        capsule.sent = true;
        capsule.dateSent = new Date();
        await capsule.save();
        console.log(`Capsule ${capsule.id} sent successfully`);
      } catch (error) {
        console.error(`Failed to send capsule ${capsule.id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in daily cron job:', error);
  } finally {
    console.log('Cron job finished:', new Date());
  }
});