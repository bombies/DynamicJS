const { Client, Intents, Collection } = require('discord.js');
const command = require('./command.js');
const Event = require('./event.js');
const fs = require('fs');
const config = require('../../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

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
        events.set('./src/events/interactions', '../events/interactions/');
        events.set('./src/events/interactions/slashcommands', '../events/interactions/slashcommands/');
        for (const [key, value] of events.entries()) {
            loadEvents(key, value, this);
        }

        this.login(token).then(token => {
            this.user.setPresence({
                game: { name: 'Developer: bombies#4445' },
                status: 'online',
            });
        }).then(token => loadSlashCommands(this));
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
 * @param {DiscordClient} client 
 */
function loadSlashCommands(client) {
    const commands = [];
    const commandFiles = fs.readdirSync('./src/commands/slash')
        .filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(`../commands/slash/${file}`)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({ version: '9' }).setToken(config.token);

    if (commands.length == 0) return;

    (async () => {
        try {
            client.guilds.fetch()
                .then(guilds => {
                    guilds.forEach(guild => {
                        rest.put(
                            Routes.applicationGuildCommands(client.application.id, guild.id),
                            { body: commands },
                        ).catch(err => console.log(`There was an error when trying to create slash commands in ${guild.name}`));
                    })
                })
            
        } catch ( ex ) {
            console.error(ex);
        }
    })();
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