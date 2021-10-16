const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedBuilder");
const axios = require("axios");
const Pages = require("../../utils/pagination/pages");

module.exports = new Command({
    name: 'currencyconverter',
    aliases: ['cc', 'convert'],
    help: {
        description: 'Convert from one currency to the next!',
        usage: '`\n' +
            'currencyconverter <amount> <fromCode> <toCode>\n' +
            'currencyconverter codes`',
        aliases: ['cc', 'convert'],
    },

    async run(message, args, client) {
        const eb = new EmbedBuilder();

        if (args.length >= 1 && args.length < 3) {
            if (args[0].toLowerCase() === 'codes') {
                axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
                    .then(response => {
                        const data = response.data;
                        const codes = [];

                        for (let key in data)
                            codes.push(`**→** \`${key}\` - *${data[key]}*`);

                        return Pages.paginateString(message.channel, message.author, codes, 20);
                    });
                return;
            } else return message.reply({
                embeds: [eb.setDescription('You must provide the amount you wish ' +
                    'to convert, the from code and the to code!')],
            });
        }

        const amount = args[0];
        const fromCode = args[1];
        const toCode = args[2];

        if (!amount || isNaN(amount))
            return message.reply({ embeds: [eb.setDescription('You must provide a valid number as the amount!')] });
    },
});