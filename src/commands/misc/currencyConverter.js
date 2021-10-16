const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedBuilder");
const axios = require("axios");
const Pages = require("../../utils/pagination/pages");
const GeneralUtils = require("../../utils/generalUtils");
const Constants = require("../../constants/constants");

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
        const eb = new EmbedBuilder().setAuthor('Currency Converter', Constants.bot.IMAGE_URL);

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
        const fromCode = args[1].toLowerCase();
        const toCode = args[2].toLowerCase();

        if (!amount || isNaN(amount))
            return message.reply({ embeds: [eb.setDescription('You must provide a valid number as the amount!')] });

        const codesRequest = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
        const codesRequestData = codesRequest.data;
        const codes = [];

        for (let key in codesRequestData)
            codes.push(key);

        if (!codes.includes(fromCode))
            return message.reply({ embeds: [eb.setDescription(`${fromCode} isn't a valid country code!`)] });

        if (!codes.includes(toCode))
            return message.reply({ embeds: [eb.setDescription(`${toCode} isn't a valid country code!`)] });

        axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCode}/${toCode}.json`)
            .then(response => {
                const data = response.data;
                const conversion = data[toCode];
                const convertedAmount =  Number(amount) * Number(conversion);

                return message.reply({ embeds: [eb.setDescription(`**$${GeneralUtils.formatNumber(Number(amount))} 
                ${fromCode.toUpperCase()}** is **$${GeneralUtils.formatNumber(convertedAmount)} ${toCode.toUpperCase()}**`)] });
            });
    },
});