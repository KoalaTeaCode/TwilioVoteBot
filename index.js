const twilio = require('twilio');
const cron = require('node-cron');

const accountSid = '';
const authToken = '';
const client = twilio(accountSid, authToken);

async function sendSMS(toNumber, messageText) {
  const defaultMessage = 'Go register to vote! http://vote.org';

  const message = await client.messages
    .create({
      body: messageText || defaultMessage,
      from: '+',
      to: `+${toNumber}`,
    });

  console.log(message.sid);
}

function generateRandomNumber(min, max) {  
  return Math.floor(Math.random() * (max - min) + min); 
}

async function sendVoteMessages() {
  const messages = [
    'You are contributing to the problem if you do not vote.',
    'People rely on you. Do you not care?',
  ];

  const numbers = [
    '1',
  ];

  for (let number of numbers) {
    const randomNumber = generateRandomNumber(0, messages.length);
    const passiveMessage = `${messages[randomNumber]} http://vote.org`;
    await sendSMS(number, passiveMessage);
  }
}

async function init() {
  cron.schedule('*/1 * * * *', async () => {
    await sendVoteMessages();
  });
}

(async () => {
  await init();
})()