const { Message } = require('discord.js');
const Command = require('../../structures/command');
const EmbedBuilder = require("../../structures/embedBuilder");
const NoteUtils = require('../../utils/database/noteUtils');
const GeneralUtils = require("../../utils/generalUtils");

/**
 *
 * @param {Message} msg
 * @param {string[]} args
 */
function add(msg, args) {
    const eb = new EmbedBuilder();

    if (args.length < 2)
        return msg.reply({ embeds: [eb.setDescription('You must provide a note to add!')] });

    let note = '';
    const words = args.slice(1, args.length + 1);
    words.forEach(word => {
        word = word.includes('\'') ? word.replaceAll('\'', '`') : word;
        note += word + ' ';
    });

    const noteUtils = new NoteUtils();
    try {
        noteUtils.addNote(msg.author.id, note).closeConnection();
        return msg.reply({ embeds: [eb.setDescription('Successfully added your note!')] });
    } catch ( ex ) {
        console.log(ex);
        return msg.reply( { embeds: [eb.setDescription('There was an issue when attempting to add your note!')] });
    }
}

/**
 *
 * @param {Message} msg
 * @param {string[] | number[]} args
 */
function remove(msg, args) {
    const eb = new EmbedBuilder();

    if (args.length < 2)
        return msg.reply({ embeds: [eb.setDescription('You must provide the id of a note to remove!')] });

    const id = args[1];

    if (isNaN(id) || !id)
        return msg.reply({ embeds: [eb.setDescription('You must provide a valid integer as an ID')] });

    const idParsed = parseInt(id);
    const noteUtils = new NoteUtils();
    noteUtils.getNotes(msg.author.id).then(notes => {
        if (idParsed <= 0 || idParsed > notes.length)
            return msg.reply({ embeds: [eb.setDescription(`\`${id}\` is an invalid ID!`)] });

        try {
            noteUtils.removeNote(msg.author.id, notes[idParsed - 1]).closeConnection();
            return msg.reply({ embeds: [eb.setDescription('You have successfully removed your note!')] });
        } catch ( ex ) {
            console.log(ex);
            return msg.reply({ embeds: [eb.setDescription('Something went wrong when trying to remove your note!')] });
        }
    });
}

/**
 *
 * @param {Message} msg
 * @returns {Message} Resultant message
 */
function removeAll(msg) {
    const eb = new EmbedBuilder();
    const noteUtils = new NoteUtils();

    try {
        noteUtils.getNotes(msg.author.id)
            .then(notes => {
                if (notes.length === 0)
                    return msg.reply({ embeds: [eb.setDescription('You already have no notes!')] });

                noteUtils.removeAllNotes(msg.author.id);
                return msg.reply({ embeds: [eb.setDescription('You have removed all your notes!')] });
            });
    } catch ( ex ) {
        console.log(ex);
        return msg.reply({ embeds: [eb.setDescription('Something went wrong when trying to remove your note!')] });
    }
}

/**
 *
 * @param {Message} msg
 */
async function view(msg) {
    const noteUtils = new NoteUtils();
    noteUtils.getNotes(msg.author.id).then(notes => {
        const eb = new EmbedBuilder();

        if (notes.length === 0)
            return msg.reply({ embeds: [eb.setDescription('You have no notes!')] });

        let description = '';
        for (let i = 0; i < notes.length; i++)
            description +=  `**${i + 1} -** ${notes[i]}\n`;
        return msg.reply({ embeds: [eb.setDescription(description)] });
    });
}

module.exports = new Command({
    name: 'notes',
    aliases: ['note'],
    help: {
        description: 'Manage your personal notes!',
        usage: '``\nnotes\n' +
            'notes add <note>\n' +
            'notes remove <id>`',
        aliases: ['note'],
    },

    async run(msg, args) {
        GeneralUtils.setCustomEmbed('Notes');
        const eb = new EmbedBuilder();

        if (args.length === 0) {
            await view(msg);
        } else {
            switch (args[0].toLowerCase()) {
                case 'add': {
                    await add(msg, args);
                } break;
                case 'remove': {
                    await remove(msg, args);
                } break;
                case 'removeall': {
                    await removeAll(msg);
                } break;
                default: {
                    msg.reply({ embeds: [eb.setDescription('Invalid usage!\nValid subcommands: `add`, `remove`')] });
                } break;
            }
        }
        GeneralUtils.setDefaultEmbed();
    },
});