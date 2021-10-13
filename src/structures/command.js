const { Client, Message, Interaction, PermissionString } = require('discord.js');
const DiscordClient = require('./client.js');
const HelpObject = require('./helpObject.js');

/**
 * 
 * @param {Message | Interaction} message 
 * @param {string[]} args 
 * @param {DiscordClient} client 
 */
function RunFunction(message, args, client) {}

class Command {
    /**
     * @typedef {{name: string, help: HelpObject, permission: PermissionString, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.help = options.help;
        this.permission = options.permission;
        this.run = options.run;
    }
}

module.exports = Command;