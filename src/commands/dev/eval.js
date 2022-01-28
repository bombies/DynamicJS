const Command = require("../../structures/command");
const config = require('../../../config.json');
const EmbedBuilder = require("../../structures/embedBuilder");

const clean = async (text) => {
    if (text && text.constructor.name == 'Promise')
        text = await text;

    if (typeof text !== 'string')
        text = require('util').inspect(text, { depth: 1});

    text = text
        .replace(/`/g, '~' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203));

    return text;
};

module.exports = new Command({
    name: 'eval',

    async run(message, args, client) {
        if (message.author.id !== config.bot_owner) return;
        const eb = new EmbedBuilder();

        try {


            const js = args.join(' ');
            let evaled;
            if (js.includes('console.log')) {
                console.oldLog = console.log;

                console.log = function(val) {
                    console.oldLog(val);
                    return val;
                };

                evaled = eval(js);
                console.log = console.oldLog;
            } else
                evaled = eval(js);

            const cleaned = await clean(evaled);
            let desc = cleaned;
            if (cleaned.length > 1024)
                desc = typeof cleaned;

            eb.setDescription(`\`\`\`js\n${js}\`\`\``);
            eb.addField('Result:', `${desc}`);
            message.reply({ embeds: [eb] });
        } catch ( err ) {
            eb.setDescription(`\`\`\`js\n${err.toLocaleString()}\`\`\``);
            message.reply({ embeds: [eb] });
        }
    },
});