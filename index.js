const admin = require('firebase-admin');
const TelegramBot = require('node-telegram-bot-api');

// Initialize Firebase with your service account key
const serviceAccount = require('./your-firebase-service-account-key.json'); // Update with the actual file path
const databaseURL = process.env.YOUR_FIREBASE_DATABASE_URL; // Environment variable for Firebase database URL
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});

// Initialize the Telegram bot
const botToken = process.env.BOT_TOKEN; // Environment variable for your Telegram bot token
const bot = new TelegramBot(botToken, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userRef = admin.firestore().collection('users').doc(String(userId));
  const groupChatId = msg.chat.id;

  if (msg.entities && msg.entities.some((entity) => entity.type === 'url')) {
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // User doesn't exist in the database, create a new entry
      userRef.set({ linkCount: 0, lastMessageTimestamp: 0, firstLinkTimestamp: 0 });
    } else {
      const userData = userDoc.data();
      const linkCount = userData.linkCount;
      const lastMessageTimestamp = userData.lastMessageTimestamp;
      const firstLinkTimestamp = userData.firstLinkTimestamp;
      const currentTimestamp = Date.now() / 1000; // Convert to seconds

      if (linkCount >= 5) {
        // User has reached the daily limit
        if (hasExceeded24HourLimit(firstLinkTimestamp, currentTimestamp)) {
          // If it's been more than 24 hours since the first link, reset the link count
          userRef.update({ linkCount: 1, lastMessageTimestamp: currentTimestamp });
          bot.sendMessage(groupChatId, `@${msg.from.username}, you have reached the maximum limit of 5 links per day. Your link count has been reset, and you can post again.`);
        } else {
          // Calculate the time remaining until the user can post again based on the first link's timestamp
          const timeRemaining = calculateTimeRemaining(firstLinkTimestamp, currentTimestamp);
          bot.sendMessage(groupChatId, `@${msg.from.username}, you have reached the maximum limit of 5 links per day. Please wait ${timeRemaining} before posting another link.`);
          // Delete the user's new links
          deleteNewLinks(groupChatId, userId, msg.message_id);
        }
      } else {
        // Increment link count and update the last message timestamp
        userRef.update({ linkCount: linkCount + 1, lastMessageTimestamp: currentTimestamp });
        if (linkCount === 0) {
          userRef.update({ firstLinkTimestamp: currentTimestamp }); // Record the timestamp of the first link of the day
        }
        bot.sendMessage(groupChatId, `Link received and counted. You have ${5 - linkCount} link(s) left for today.`);
      }
    }
  }
});

function hasExceeded24HourLimit(firstLinkTimestamp, currentTimestamp) {
  const secondsInDay = 24 * 60 * 60;
  return currentTimestamp - firstLinkTimestamp >= secondsInDay;
}

function calculateTimeRemaining(firstLinkTimestamp, currentTimestamp) {
  const secondsInDay = 24 * 60 * 60;
  const timeSinceFirstLink = currentTimestamp - firstLinkTimestamp;
  const timeRemaining = secondsInDay - timeSinceFirstLink;

  if (timeRemaining <= 0) {
    return '0 hours, 0 minutes, 0 seconds';
  }

  const hoursRemaining = Math.floor(timeRemaining / (60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (60 * 60)) / 60);
  const secondsRemaining = Math.floor(timeRemaining % 60);
  return `${hoursRemaining} hours, ${minutesRemaining} minutes, and ${secondsRemaining} seconds`;
}

function deleteNewLinks(chatId, userId, messageId) {
  const options = {
    chat_id: chatId,
    message_id: messageId,
  };

  bot.deleteMessage(chatId, messageId).catch((error) => {
    console.error('Error deleting message:', error);
  });
}

console.log('Bot is running...');
