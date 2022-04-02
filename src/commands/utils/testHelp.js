const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Command = require("../../structures/command");

const generalHelp  = { // Creates generalHelp embed.
    color: 0x901ab6,
    title: 'join our support server!',
    url: 'https://discord.gg/MUwJ85wpKP',
    author: {
        name: 'Help Menu',
        icon_url: 'https://cdn.discordapp.com/attachments/937276227692150815/937552170520301588/Letter_Z.png',
    },
    description: 'Select an option to view the commands I have!',
    fields: [
        {
            name: ':tada: Fun Commands',
            value: 'Shows all the bots varying fun commands in a nice little page for easy viewing.',
            inline: true,
        },
        {
            name: ':tools: Admin Commands',
            value: 'Shows all the bots varying admin commands in a nice little page for easy viewing.',
            inline: true,
        },
        /*{
            name: '\u200b',
            value: ' \u200b ',
            inline: false,
        },*/
    ],
}

const row = new MessageActionRow() // Creates MessageActionRow with name row.
.addComponents(
    new MessageSelectMenu()
    .setCustomId('select')
    .setPlaceholder('Select an option')
    .addOptions([
        {
           label: '🎉 Fun Commands',
           description: 'These are fun commands',
           value: 'first_option',
        },
        {
            label: '🔨 Admin Commands',
            description: 'These are admin commands',
            value: 'second_option',
        },

    ])
)

module.exports = new Command({
    name: 'testhelp',
    help: {
        description: 'This is a test help command',
        usage: 'testhelp'
    },

    async run(message, args, client) {
        message.reply({embeds: [generalHelp], components: [row], ephemeral: true});
    }
});