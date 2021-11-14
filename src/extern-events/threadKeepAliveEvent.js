const { Guild, ThreadChannel } =  require('discord.js');

class ThreadLife {

    /**
     * 
     * @param {Guild} guild 
     * @param {String} channelID 
     * @param {String} threadID 
     */
    constructor(guild, channelID, threadID) {
        this.guild = guild;
        this.channelID = channelID;
        this.threadID = threadID;
    }

    keepAlive() {
        this.revive();
        setInterval(() => this.revive(), 86400000);
    }

    async revive() {
       this.#fetchThread().then(channel => {
           channel.send('Kept alive!')
                .then(msg => msg.delete());
       })
    }

    /**
     * 
     * @returns {Promise<ThreadChannel>} The thread channel object
     */
    async #fetchThread() {
        return this.guild.channels.fetch(this.channelID)
            .then(channel => channel.threads.cache.find(thread => thread.id === this.threadID));
    }
}

module.exports = ThreadLife;
