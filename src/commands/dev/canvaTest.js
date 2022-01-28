const Command = require("../../structures/command");
const CanvaCord = require('canvacord');
const config = require('../../../config.json');
const { MessageAttachment } = require('discord.js');

module.exports = new Command({
    name: 'canva',

    async run(message, args, client) {
        if (message.author.id !== config.bot_owner) return;
        
        const member = message.member;

        const test = new CanvaCord.Rank()
            .setAvatar(member.avatarURL)
            .setCurrentXP(100)
            .setRequiredXP(200)
            .setStatus("online")
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator);
        
        console.log("Attempting to build...");

        test.build()
            .then(data => {
                CanvaCord.Canvacord.write(data, "canvatest.png");
            })
    }
});
