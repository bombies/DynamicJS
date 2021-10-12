const Client = require('./structures/client.js');
const Command = require('./structures/command.js');
const client = new Client();
const fs = require('fs');
const EmbedBuilder = require('./structures/embedbuilder.js');

fs.readdirSync('commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        /**
         * @type {Command}
         */
        const command = require(`./commands/${file}`);
        console.log(`Command ${command.name} loaded`);
        client.commands.set(command.name, command);
    });

const config = require('./config.json');

client.on('ready', () => {
    /**
     * @type {EmbedBuilder}
     */
    EmbedBuilder.defaultColor('#e8172d');
    console.log('The client is ready!');
});

client.on('messageCreate', message => {
    
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name === args[0]);

    if (!command) return;

    command.run(message, args, client);
});

client.login(config.token);