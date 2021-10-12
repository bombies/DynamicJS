const { ClientEvents } = require('discord.js');
const DiscordClient = require('./client.js');

/**
 * @template {keyof ClientEvents} K
 * @param {DiscordClient} client 
 * @param  {ClientEvents[K]} eventArgs 
 */
function RunFunction(client, ...eventArgs) {}

/**
 * @template {keyof ClientEvents} K
 */
class Event {
    /**
     * 
     * @param {K} event 
     * @param {RunFunction<K>} runFunction 
     */
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
        
    }
}

module.exports = Event;