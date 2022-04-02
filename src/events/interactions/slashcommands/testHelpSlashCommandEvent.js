const Event = require("../../../structures/event");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

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

const adminHelp = { // Creates moderationHelp embed.
    color: 0x901ab6,
    author: {
        name: 'Help Menu',
        icon_url: 'https://cdn.discordapp.com/attachments/937276227692150815/937552170520301588/Letter_Z.png',
    },
    description: 'Here are the commands!',
    fields: [
        {
            name: 'Prefix: `/`',
            value: '\u200b',
        },
        {
            name: ':tools: Admin Commands',
            value: '`toggle`, `settings`'
        },
    ]
}

const funHelp = { // Creates funHelp embed.
    color: 0x901ab6,
    author: {
        name: 'Help Menu',
        icon_url: 'https://cdn.discordapp.com/attachments/937276227692150815/937552170520301588/Letter_Z.png',
    },
    description: 'Here are the commands!',
    fields: [
        {
            name: 'Prefix: `/`',
            value: '\u200b',
        },
        {
            name: ':tada: Fun Commands',
            value: '`ping`, `poll`',
        },
    ]
}

const row = new MessageActionRow() // Creates MessageActionRow with name row.
.addComponents(
    new MessageSelectMenu()
    .setCustomId('select')
    .setPlaceholder('Select an option')
    .addOptions([
        {
           label: '🎉 Fun Commands',
           description: '',
           value: 'first_option',
        },
        {
            label: '🔨 Admin Commands',
            description: '',
            value: 'second_option',
        },

    ])
)

module.exports = new Event('interactionCreate', (client, interaction) => {
    if (!interaction.isSelectMenu() && interaction.isCommand()) {
        interaction.reply({ embeds: [generalHelp], components: [row], ephemeral: true})
    } else return;

    if(interaction.customId !== 'select') return

    switch (interaction.values[0]) {
        case 'first_option':
            interaction.update({embeds: [funHelp], ephemeral: true})
            break
        case 'second_option':
            interaction.update({embeds: [adminHelp], ephemeral: true})
            break
        default:
            return
    }
})