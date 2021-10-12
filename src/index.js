const Client = require('./structures/client.js');
const client = new Client();
const EmbedBuilder = require('./structures/embedbuilder.js');
const config = require('./config.json');

client.start(config.token);