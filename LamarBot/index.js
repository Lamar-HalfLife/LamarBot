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

let participants = [];

client.on('message', (target, user, message, self) => {
    if(self) return;

    if(message == 'sa') {
        client.say(channel, `@${user.username} as`);
    }

    if(message == '!roll') {
        const roll = Math.floor(Math.random() * 6) + 1;
        client.say(channel, `@${user.username} rolled a ${roll}`);
    }

    if (message === '!çekiliş') {
        if (!participants.includes(user.username)) {
            participants.push(user.username);
            client.say(channel, `@${user.username} katıldı. Şimdi ${participants.length} kişi var.`);
        } else {
            client.say(channel, `@${user.username} zaten katıldı.`);
        }
    } else if (message === '!çekiliş draw') {
        client.mods(channel).then(mods => {
            if (mods.includes(user.username) || user.badges.broadcaster) {
                if (participants.length === 0) {
                    client.say(channel, `Hiçbir katılımcı yok.`);
                } else {
                    const winnerIndex = Math.floor(Math.random() * participants.length);
                    const winner = participants[winnerIndex];
                    client.say(channel, `Kazanan: @${winner}`);
                    participants = [];
                }
            } else {
                client.say(channel, `Bu komutu yalnızca yetkili kişiler ve yayıncılar kullanabilir.`);
            }
        });
    } else if (message === '!çekiliş clear') {
        client.mods(channel).then(mods => {
            if (mods.includes(user.username) || user.badges.broadcaster) {
                participants = [];
                client.say(channel, `Katılımcılar başarıyla temizlendi.`);
            } else {
                client.say(channel, `Bu komutu yalnızca yetkili kişiler ve yayıncılar kullanabilir.`);
            }
        });
    }
});
