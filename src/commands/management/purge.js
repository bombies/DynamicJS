const Constants = require("../../constants/constants");
const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedBuilder");

module.exports = new Command({
    name: "purge",
    help: {
        description: 'Remove a certain number of messages from a channel',
        usage: 'purge <amount>',
    },
    permission: "MANAGE_CHANNELS",

    async run(message, args, client) {
        const eb = new EmbedBuilder();

        if (args.length === 0)
            return message.reply({ embeds: [eb.setDescription('You must specifiy how much messages you wish to purge.')] });

        const amount = args[0];

        if (!amount || isNaN(amount))
            return message.reply({ embeds: [eb.setDescription(`${amount} is not a valid amount.`)] });

        const amountParsed = parseInt(amount);

        if (amount > Constants.bot.MAX_BULK_DELETE)
            return message.reply({ embeds: [eb.setDescription(`You cannot clear more than ${Constants.bot.MAX_BULK_DELETE} messages.`)] });
        else if (amount <= 0)
            return message.reply({ embeds: [eb.setDescription('You must provide a number greater than 0.')] });

        message.channel.bulkDelete(amountParsed);
        
        const msg = await message.channel.send({ embeds: [eb.setDescription(`🗑️  Purged ${amountParsed} messages.`)] });

        setTimeout(() => msg.delete(), 5000);
    },
});