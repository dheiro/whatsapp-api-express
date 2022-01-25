const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

let session;

if (fs.existsSync('./whatsapp-session.json')) {
  session = require('../whatsapp-session.json');
}

const client = new Client({
  session,
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  fs.writeFileSync('./whatsapp-session.json', JSON.stringify(session));
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (msg) => {
  console.log(msg);
  if (msg.body === '!ping') {
    msg.reply('pong');
  }
});

client.initialize();
