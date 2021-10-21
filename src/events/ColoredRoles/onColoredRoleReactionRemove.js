const Event = require('../../structures/event');
const ColorRolesConfig = require("../../commands/misc/roles/utils/colorRolesConfig");

module.exports = new Event('messageReactionRemove', async (client, reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch ( ex ) {
            console.error('Something went wrong when fetching the message:', ex);
            return;
        }
    }

    const config = new ColorRolesConfig();
    const guild = reaction.message.guild;
    const message = await config.getMessageAsync(guild.id, client);

    if (message.id !== reaction.message.id) return;

    const reactions = await config.getReactionsAsync(guild.id);

    if (!reactions.includes(reaction.emoji.name)) {
        reaction.users.remove(user.id);
        return;
    }

    const role = await config.getRoleFromReaction(guild.id, reaction.emoji.name);
    const roleID = role['id'];
    const member = await guild.members.fetch(user.id);

    if (member.roles.cache.find(role => role.id === roleID)) {
        const roleToRemove = await guild.roles.fetch(roleID);
        member.roles.remove(roleToRemove);
    }
});