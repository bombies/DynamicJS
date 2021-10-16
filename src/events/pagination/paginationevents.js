const { ButtonInteraction, Message } = require("discord.js");
const Constants = require("../../constants/constants");
const EmbedBuilder = require("../../structures/embedBuilder");
const Event = require("../../structures/event");
const Pages = require('../../utils/pagination/pages');

module.exports = new Event('interactionCreate', (client, interaction) => {
    if (!interaction.isButton()) return;

    /**
     * @type {ButtonInteraction}
     */
    const button = interaction;
    /**
     * @type {Message}
     */
    const msg = button.message;
    const user = button.user;
    const currentPage = Pages.currentPage;

    if (!currentPage.has(msg))
        currentPage.set(msg, 0);
    
    const pages = Pages.getPages(msg);
    try {
        if (button.customId === `${Constants.pagination.FRONT}${user.id}`) {
            currentPage.set(msg, 0);
            button.update({ embeds: [pages[0].embed] });

        } else if (button.customId === `${Constants.pagination.PREVIOUS}${user.id}`) {
            if (currentPage.get(msg) === 0) {
                button.deferUpdate();
                return;
            }

            currentPage.set(msg, currentPage.get(msg) - 1);
            button.update({ embeds: [pages[currentPage.get(msg)].embed] });

        } else if (button.customId === `${Constants.pagination.NEXT}${user.id}`) {
            if (currentPage.get(msg) === pages.length - 1) {
                button.deferUpdate();
                return;
            }

            currentPage.set(msg, currentPage.get(msg) + 1);
            button.update({ embeds: [pages[currentPage.get(msg)].embed] });

        } else if (button.customId === `${Constants.pagination.END}${user.id}`) {
            currentPage.set(msg, pages.length - 1);
            button.update({ embeds: [pages[currentPage.get(msg)].embed] });

        } else {
            eb = new EmbedBuilder().setDescription('You do not have permission to interact with this button.');
            button.reply({ embeds: [eb], ephemeral: true });
        }
    } catch ( ex ) {
        if (!(ex instanceof TypeError))
            console.log(ex);
        // Error ignored if it's a TypeError. Most likely trying to interact with a button that doesn't exist anymore.
    }
});