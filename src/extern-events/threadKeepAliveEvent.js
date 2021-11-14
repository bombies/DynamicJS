const { Guild, ThreadChannel } =  require('discord.js');

class ThreadLife {

    /**
     * 
     * @param {Guild} guild 
     * @param {String} threadID 
     */
    constructor(guild, threadID) {
        this.guild = guild;
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
        return this.guild.channels.fetch(this.threadID);
    }
}

module.exports = ThreadLife;
