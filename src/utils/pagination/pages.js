const { TextBasedChannels, User, MessageActionRow, MessageButton, Message } = require('discord.js');
const Constants = require('../../constants/constants');
const EmbedBuilder = require('../../structures/embedBuilder');
const Page = require('./page');

class Pages {
    /**
     * @type {Map<string, Page[]>}
     */
    static #messages = new Map();
    /**
     * @type {Map<Message, Number>}
     */
    static currentPage = new Map();

    /**
     * 
     * @param {TextBasedChannels} channel 
     * @param {User} user 
     * @param {Page[]} pages 
     * @returns {Message} Message sent
     */
    static async paginate(channel, user, pages) {
        const msg = await channel.send({ embeds: [pages[0].embed] });

        if (pages.length > 1) {
            const buttonRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`${Constants.pagination.FRONT}${user.id}`)
                        .setLabel(`${Constants.pagination.FRONT_LABEL}`)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId(`${Constants.pagination.PREVIOUS}${user.id}`)
                        .setLabel(`${Constants.pagination.PREVIOUS_LABEL}`)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId(`${Constants.pagination.NEXT}${user.id}`)
                        .setLabel(`${Constants.pagination.NEXT_LABEL}`)
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId(`${Constants.pagination.END}${user.id}`)
                        .setLabel(`${Constants.pagination.END_LABEL}`)
                        .setStyle('PRIMARY'),
                );
            
            msg.edit({ embeds: [pages[0].embed], components:[buttonRow] });    
            this.#messages.set(msg.id, pages);
        }

        return msg;
    }

    /**
     * 
     * @param {TextBasedChannels} channel 
     * @param {User} user 
     * @param {string[]} content 
     * @param {Number} maxPerPage
     * @returns {Message} Message sent 
     */
    static paginateString(channel, user, content, maxPerPage) {
        
        /**
         * @type {Page[]}
         */
        let pages = [];

        if (content.length <= maxPerPage) {
            let eb = new EmbedBuilder().setDescription('\t');
            content.forEach(line => {
                eb.description += line + '\n';
            });
            pages.push(new Page(eb))
        } else {
            let pagesRequired = Math.ceil(content.length / maxPerPage);
            let lastIndex = 0;

            for (let i = 0; i < pagesRequired; i++) {
                let eb = new EmbedBuilder().setDescription('\t');
                for (let j = 0; j < maxPerPage; j++) {
                    if (lastIndex === content.length) break;

                    eb.description += content[lastIndex]  + '\n';
                    lastIndex++;
                }
                pages.push(new Page(eb));
            }
        }

        return this.paginate(channel, user, pages);
    }

    /**
     * 
     * @param {Message} msg 
     * @returns 
     */
    static getPages(msg) {
        return this.#messages.get(msg.id);
    }
}

module.exports = Pages;