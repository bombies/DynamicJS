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
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ],
             });
        
        /**
         * @type {Collection<string, command>}
         */
        this.commands = new Collection();
    }

    start(token) {
        const commands = new Map();
        const events = new Map();
        commands.set('./src/commands', '../commands/');
        commands.set('./src/commands/misc', '../commands/misc/');
        commands.set('./src/commands/misc/roles', '../commands/misc/roles/');
        commands.set('./src/commands/management', '../commands/management/');
        commands.set('./src/commands/dev', '../commands/dev/');
        commands.set('./src/commands/utils', '../commands/utils/');
        for (const [key, value] of commands.entries()) {
            loadCommands(key, value, this);
        }
        
        events.set('./src/events', '../events/');
        events.set('./src/events/pagination', '../events/pagination/');
        events.set('./src/events/ColoredRoles', '../events/ColoredRoles/');
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
 * @param {DiscordClient} client
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