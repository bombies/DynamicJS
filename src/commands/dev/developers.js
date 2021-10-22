const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedBuilder");
const BotUtils = require("../../utils/database/botUtils");
const config = require('../../config.json');
const GeneralUtils = require("../../utils/generalUtils");
const Constants = require("../../constants/constants");

/**
 *
 * @param {Message} message
 * @param {string[]} args
 * @param {DiscordClient} client
 */
async function add(message, args, client) {
    const eb = new EmbedBuilder();

    if (args.length === 1)
        return message.reply({ embeds: [eb.setDescription('You must provide a user to add as a developer.')] });

    const id = GeneralUtils.getDigitsOnly(args[1]);

    if (!GeneralUtils.isID(id))
        return message.reply({ embeds: [eb.setDescription('You must provide a valid user to add as a developer!')] });

    const user = await client.users.fetch(id)
                            .catch(err => {});

    if (!user)
        return message.reply({ embeds: [eb.setDescription('You must provide a valid user to add as a developer!')] });

    const botUtils = new BotUtils();

    if (await botUtils.isDeveloper(id))
        return message.reply({ embeds: [eb.setDescription('This user is already a developer!')] });
    else
        await botUtils.addDeveloper(id);

    return message.reply({ embeds: [eb.setDescription(`Added ${user.tag} as a developer!`)] });
}

async function remove(message, args, client) {
    const eb = new EmbedBuilder();

    if (args.length === 1)
        return message.reply({ embeds: [eb.setDescription('You must provide a user to add as a developer.')] });

    const id = GeneralUtils.getDigitsOnly(args[1]);

    if (!GeneralUtils.isID(id))
        return message.reply({ embeds: [eb.setDescription('You must provide a valid user to add as a developer!')] });

    const user = await client.users.fetch(id)
        .catch(err => {});

    if (!user)
        return message.reply({ embeds: [eb.setDescription('You must provide a valid user to add as a developer!')] });

    const botUtils = new BotUtils();

    if (!await botUtils.isDeveloper(id))
        return message.reply({ embeds: [eb.setDescription('This user is not a developer!')] });
    else
        await botUtils.removeDeveloper(id);

    return message.reply({ embeds: [eb.setDescription(`Removed ${user.tag} as a developer!`)] });
}

module.exports = new Command({
    name: 'developers',
    aliases: 'dev',
    help: {
        name: 'developers',
        aliases: ['dev'],
        description: 'Manage the bot\'s developers',
        usage: 'dev\n' +
            'dev add <user>\n' +
            'dev remove <user>',
    },

    async run(message, args, client) {
        if (message.author.id !== config.bot_owner) return;

        const eb = new EmbedBuilder();
        const botUtils = new BotUtils();

        if (args.length === 0) {
            let developers = await botUtils.getDevelopers();
            let description = '';

            for (const developer of developers)
                description += `**→** <@${developer}> - *(${developer})*\n`;


            eb.setAuthor('DynamicJS Developers', Constants.bot.IMAGE_URL);
            message.reply({ embeds: [eb.setDescription(developers.length === 0 ? 'There are no developers' : description)] });
        } else {
            switch (args[0].toLowerCase()) {
                case "add":
                    await add(message, args, client);
                    break;
                case "remove":
                    await remove(message, args, client);
                    break;
            }
        }
    },
});