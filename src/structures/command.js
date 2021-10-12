const { Client, Message, Interaction } = require('discord.js');
const DiscordClient = require('./client.js');

/**
 * 
 * @param {Message | Interaction} message 
 * @param {string[]} args 
 * @param {DiscordClient} client 
 */
function RunFunction(message, args, client) {}

class Command {
    /**
     * @typedef {{name: string, description: string, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}

module.exports = Command;