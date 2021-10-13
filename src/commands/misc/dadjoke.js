const { default: axios } = require("axios");
const Constants = require("../../constants/constants");
const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedbuilder");

module.exports = new Command({
    name: 'dadjoke',
    help: {
        description: 'Get a random dad joke',
        usage: 'dadjoke',
    },

    async run(msg, args, client) {
        const eb = new EmbedBuilder();
        
        try {
            axios.get('https://icanhazdadjoke.com/', Constants.API_HEADER)
                .then(response => {
                    const data = response.data;
                    msg.reply({ embeds: [eb.setDescription(data['joke'])] });
                });
        } catch ( ex ) {
            return msg.reply({ embeds: [eb.setDescription('There was an issue contacting the API')] });
        }
    },
});