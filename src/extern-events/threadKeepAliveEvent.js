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

    async keepAlive() {
        await this.revive();
        setInterval(() => this.revive(), 86400000);
    }

    async revive() {
        this.#fetchThread().then(thread => {
            thread.send('Kept alive!')
                .then(msg => msg.delete());
        }) 
    }

    /**
     * 
     * @returns {Promise<ThreadChannel>} The thread channel object
     */
    async #fetchThread() {
        const channel = await this.guild.channels.fetch(this.channelID);
        const thread = await channel.threads.fetch(this.threadID);

        return thread;
    }
}

module.exports = ThreadLife;
