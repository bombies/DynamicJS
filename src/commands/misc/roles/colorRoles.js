const Command = require("../../../structures/command");
const { Permissions, Message } = require("discord.js");
const EmbedBuilder = require("../../../structures/embedBuilder");
const ColorRolesConfig = require("./utils/colorRolesConfig");
const GeneralUtils = require("../../../utils/generalUtils");

/**
 *
 * @param {Message} message
 */
async function init(message) {
    const channel = message.channel;
    const guild = message.guild;
    const config = new ColorRolesConfig();
    const eb = new EmbedBuilder();

    const rolesMessage = await channel.send({ embeds: [eb.setDescription('⚠️  There are no roles as yet!\n*Roles will appear here once more has been added.*')] });

    config.setChannel(guild.id, channel.id, () => {
        config.setMessage(guild.id, rolesMessage.id);
    });
}

/**
 *
 * @param {Message} message
 * @param {string[]} args
 * @param {DiscordClient} client
 * @return {Promise<*>}
 */
async function add(message, args, client) {
    const eb = new EmbedBuilder();
    const guild = message.guild;
    const config = new ColorRolesConfig();

    if (!await config.channelIsInit(guild.id))
        return message.reply({ embeds: [eb.setDescription('You must initialize a channel before you can run this command! `roles init`')] });

    if (args.length < 4)
        return message.reply({ embeds: [eb.setDescription('You must provide the **name of the role**, **hex code** of the color and the **reaction emoji** to display this role!')] });

    if (!GeneralUtils.isHex(args[2]))
        return message.reply({ embeds: [eb.setDescription(`\`${args[2]}\` is an invalid hex code!\n\nℹ️ **‖**  *Hex codes look like \`#FF00DDA\`*`)] });

    if (!GeneralUtils.isEmoji(args[3]))
        return message.reply({ embeds: [eb.setDescription(`\`${args[3]}\` is in invalid reaction!`)] });

    const testReaction = await config.getRoleFromReaction(guild.id, args[3]);

    if (testReaction !== undefined || testReaction)
        return message.reply({ embeds: [eb.setDescription('This reaction is already assigned to another role!')] });

    const roleName = args[1];
    const hexCode = args[2];
    const reaction = args[3];

    const createdRole = await guild.roles.create({
        name: roleName,
        color: hexCode,
        reason: 'Color role created!',
    });

    config.addRole(guild.id, roleName, hexCode, createdRole.id, reaction);

    await message.reply({ embeds: [eb.setDescription(`You have successfully made the ${roleName} role!`).setColor(hexCode)] });

    updateMessage(config, guild, client);
    updateReactions(config, guild, client);
}

async function remove(message, args, client) {
    const eb = new EmbedBuilder();
    const guild = message.guild;
    const config = new ColorRolesConfig();

    if (!await config.channelIsInit(guild.id))
        return message.reply({ embeds: [eb.setDescription('You must initialize a channel before you can run this command! `roles init`')] });

    if (args.length < 2)
        return message.reply({ embeds: [eb.setDescription('You must provide the ID of the role as an argument.')] });

    if (!GeneralUtils.isID(args[1]))
        return message.reply({ embeds: [eb.setDescription('The argument provided isn\' a valid ID!')] });

    const role = await guild.roles.fetch(args[1]);

    if (role === undefined || role === null)
        return message.reply({ embeds: [eb.setDescription(`The id \`${args[1]}\` doesn't belong to a valid role in this guild!`)] });

    await role.delete();

    config.removeRole(guild.id, role.id);

    message.reply({ embeds: [eb.setDescription(`You have successfully removed the \`${role.name}\` role!`)] });

    updateMessage(config, guild, client);
    updateReactions(config, guild, client);

}

/**
 *
 * @param {ColorRolesConfig} config
 * @param {Guild} guild
 * @param {DiscordClient} client
 */
function updateMessage(config, guild, client) {
    const eb = new EmbedBuilder();
    config.getMessage(guild.id, client, message => {
        config.getRoles(guild.id, roles => {
            let description = '';
            roles.forEach(role => description += `${role.reaction} **${role.name}**\n`);
            message.edit({ embeds: [eb.setDescription(description)] });
        });
    });
}

/**
 *
 * @param {ColorRolesConfig} config
 * @param {Guild} guild
 * @param {DiscordClient} client
 */
function updateReactions(config, guild, client) {
    config.getMessage(guild.id, client, message => {
       config.getReactions(guild.id, async reactions => {
           for (const reaction of reactions) {
               const x = message.reactions.cache.find(msgReaction => msgReaction.emoji.name === reaction);
               if (!x)
                   await message.react(reaction);
           }
       });
    });
}

module.exports = new Command({
    name: 'roles',
    aliases: ['role'],
    help: {
        description: 'Configure the coloured roles for this server',
        usage: '\nrole init`\n*(Initialize the channel in which users are to select the role(s) they want to have)*\n\n' +
            '`role add <roleName> <colorHex> <reactionEmoji>`\n*(Add a specific role to the config and message)*\n\n' +
            '`role remove <roleID>`\n*(Remove a specific role from the config and message)*\n`',
        aliases: ['role'],
    },

    async run(message, args, client) {
        "use strict";
        const member = message.member;

        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return;

        GeneralUtils.setCustomEmbed('Roles');

        const eb = new EmbedBuilder();

        if (args.length === 0)
            return message.reply({ embeds: [eb.setDescription('You must provide arguments!\n' +
                    '*Valid subcommands:* `init`, `add`, `remove`')] });

        switch (args[0].toLowerCase()) {
            case "init":
                await init(message);
                break;
            case "add":
                await add(message, args, client);
                break;
            case "remove":
                await remove(message, args, client);
                break;
        }

        GeneralUtils.setDefaultEmbed();
    },
});