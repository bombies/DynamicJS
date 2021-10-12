const { Client, Intents, Collection } = require('discord.js');
const command = require('./command.js');
const Event = require('./event.js');
const fs = require('fs');
const config = require('../config.json');

class DiscordClient extends Client {
    constructor() {
        super({ intents: [
                Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            ],
             });
        
        /**
         * @type {Collection<string, command>}
         */
        this.commands = new Collection();
        this.prefix = config.prefix;
    }

    start(token) {
        const commands = new Map();
        const events = new Map();
        commands.set('../src/commands', '../commands/');
        commands.set('../src/commands/misc', '../commands/misc/');
        for (const [key, value] of commands.entries()) {
            loadCommands(key, value, this);
        }
        
        events.set('../src/events', '../events/');
        for (const [key, value] of events.entries()) {
            loadEvents(key, value, this);
        }

        this.login(token).then(token => {
            this.user.setPresence({
                game: { name: 'Developer: bombies#4445' },
                status: 'online',
            });
        });
    }
}

/**
 * 
 * @param {string} path 
 * @param {string} commandFolder
 * @param {Client} client
 */
function loadCommands(path, commandFolder, client) {
    fs.readdirSync(path)
        .filter(file => file.endsWith('.js'))
        .forEach(file => {
            /**
            * @type {Command}
            */
            const command = require(commandFolder + `${file}`);
            client.commands.set(command.name, command);
        });
}

/**
 * 
 * @param {string} path 
 * @param {string} eventFolder
 * @param {Client} client
 */
 function loadEvents(path, eventFolder, client) {
    fs.readdirSync(path)
        .filter(file => file.endsWith('.js'))
        .forEach(file => {
            /**
            * @type {Event}
            */
            const event = require(eventFolder + `${file}`);
            client.on(event.event, event.run.bind(null, client));
        });
}

module.exports = DiscordClient;