const { Client, Intents, Collection } = require("discord.js");
const command = require('./command.js');

class DiscordClient extends Client {
    constructor(options) {
        super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        
        /**
         * @type {Collection<string, command>}
         */
        this.commands = new Collection();
    }
}

module.exports = DiscordClient;