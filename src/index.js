const Client = require('./structures/client.js');
const client = new Client();
const config = require('./config.json');

client.start(config.token);