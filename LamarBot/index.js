const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: true },
    connection: {
        reconnection: true,
        secure: true
    },
    identity: {
        username,
        password
    },
    channels: [channel]
};
const client = new tmi.Client(options);
client.connect().catch(console.error);

client.on('connected', () => {
    client.say(channel, 'Lamar01001_bot has connected!');
});

client.on('message', (channel, _user, message, self) => {
    if(self) return;

    if(message == 'sa') {
        client.say(channel, 'as');
    }
});