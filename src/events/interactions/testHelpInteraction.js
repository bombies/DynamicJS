const Event = require('../../structures/event');

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


module.exports = new Event('interactionCreate', (client, interaction) => {
    if (!interaction.isSelectMenu())
        return;

    if (interaction.customId !== 'select')
        return;

    switch (interaction.values[0]) {
        case 'first_option':
            interaction.update({embeds: [funHelp], ephemeral: true});
            break;
        case 'second_option':
            interaction.update({embeds: [adminHelp], ephemeral: true});
            break;
        default:
            return; 
    }
});