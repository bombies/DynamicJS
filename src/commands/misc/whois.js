const { Role } = require('discord.js');
const Command = require('../../structures/command');
const EmbedBuilder = require('../../structures/embedbuilder');
const GeneralUtils = require('../../utils/generalutils');

module.exports = new Command({
    name: 'whois',
    help: {
        description: 'Get information about a user',
        usage: `whois <@user>`,
    },
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const eb = new EmbedBuilder();

        if (args.length == 0) {
            eb.setDescription('You must provide a user to lookup');
            message.reply({ embeds: [eb] });
            return;
        }
        
        const id = GeneralUtils.getDigitsOnly(args[0]);

        if (!GeneralUtils.isID(id)) {
            eb.setDescription(`${args[0]} isn't a valid user.`);
            message.reply({ embeds: [eb] });
            return;
        }

        try {
            await message.guild.members.fetch(id)
                .then(function(member) {
                    /**
                     * @type {Role[]}
                     */
                    const roles = [];
                    var roleStr = '', dummy;

                    member.roles.cache.forEach(
                        role => (role != undefined && role.id != message.guild.id) ? roles.push(role) : dummy,
                    );

                    roles.forEach(role => {
                        roleStr += `<@&${role.id}> `;
                    });

                    eb.setAuthor(member.user.tag, member.user.avatarURL())
                        .addFields(
                            { 
                                name: 'Joined', 
                                value: member.joinedAt.toLocaleDateString('en-US', { 
                                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', 
                                }) + " " +  member.joinedAt.toLocaleTimeString('en-US'), 
                                inline: true,
                            },
                            {
                                name: 'Registered',
                                value: member.user.createdAt.toLocaleDateString('en-US', { 
                                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', 
                                }) + " " + member.user.createdAt.toLocaleTimeString('en-US'),
                                inline: true,
                            },
                            {
                                name: `Roles [${roles.length}]`,
                                value: roleStr,
                            },
                        );
                    eb.setThumbnail(member.user.avatarURL({ dynamic: true }));
                    eb.setFooter(`ID: ${member.id}`);
                    eb.setTimestamp(message.createdTimestamp);
                });
        } catch ( ex ) {
            console.log(ex);
            eb.setDescription(`\`${id}\` was not found.`);
        }

        message.reply({ embeds: [eb] });
    },
});