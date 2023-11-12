# LinkWatchdog Bot

LinkWatchdog Bot is your vigilant guardian in Telegram group chats. Its mission is to maintain a spam-free and orderly environment, allowing everyone to enjoy meaningful conversations without the clutter of excessive links. LinkWatchdog Bot keeps a watchful eye on link sharing within your group and enforces a fair daily limit of 5 links per user.

**Creator: HykeLauncher**

## Features

- **Link Monitoring:** LinkWatchdog Bot tracks and monitors every link shared in your group.

- **Daily Limit:** Users are allowed to share up to 5 links per day.

- **Friendly Reminders:** If a user exceeds the daily limit, the bot sends a friendly reminder.

- **Automatic Reset:** LinkWatchdog Bot resets the link count every 24 hours from the first link posted, ensuring a fair and consistent experience.

- **User-Friendly:** The bot enhances group chat quality without causing inconvenience.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Firebase Setup](#firebase-setup)
  - [Obtaining the `firebase-service-account-key.json`](#obtaining-the-firebase-service-account-keyjson)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

These instructions will help you get your LinkWatchdog Bot up and running.

### Prerequisites

Before you start, you need to have the following in place:

- A Telegram bot token.
- A Firebase database to store user data.

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).

2. Click "Add project" and follow the steps to create a new Firebase project.

3. In the project dashboard, click on "Database" in the left menu.

4. Click "Create Database" and choose "Start in test mode" for now.

5. Your Firebase database is now set up. Click on "Project settings" (the gear icon) in the left menu, and you'll find the Firebase database URL. This URL will be used in your environment variables.

### Obtaining the `firebase-service-account-key.json`

In order to authenticate your bot with Firebase, you'll need to obtain a service account key in JSON format. Here's how to do it:

1. In the [Firebase Console](https://console.firebase.google.com/), select your project.

2. Click on the gear icon (Project settings) in the left menu.

3. Navigate to the "Service accounts" tab.

4. Under "SDK setup and configuration," click on "Generate new private key."

5. A JSON file containing your service account key will be downloaded to your computer. Save this file as `firebase-service-account-key.json`.

### Installation

1. Clone the repository to your local machine.

```bash
git clone https://github.com/hykelauncher/linkwatchdog-bot.git
```

2. Install the required Node.js packages using npm.

```bash
npm install
```

3. Set up your environment variables. Create a `.env` file and add the following:

```
BOT_TOKEN=your-telegram-bot-token
FIREBASE_DATABASE_URL=your-firebase-database-url
```

4. Start the bot.

```bash
node index.js
```

## Usage

Once the bot is running and configured in your Telegram group, LinkWatchdog Bot will automatically monitor and enforce the link-sharing limit.

## Contributing

Contributions are welcome! If you want to improve or extend LinkWatchdog Bot, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Telegram Bot API](https://core.telegram.org/bots)
- [Firebase](https://firebase.google.com/)
