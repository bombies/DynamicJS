const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedbuilder");
const axios = require('axios');
const Constants = require("../../constants/constants");

module.exports = new Command({
    name: 'meme',
    help: {
        description: 'Get a random meme',
        usage: 'meme',
    },

    async run(msg, args, client) {
        const eb = new EmbedBuilder();

        try {
            axios.get('https://apis.duncte123.me/meme', Constants.API_HEADER)
                .then(response => {
                    const data = response.data['data'];
                    const title = data['title'];
                    const image = data['image'];
                    const link = data['url'];

                    msg.reply({ embeds: [eb.setTitle(title).setURL(link).setImage(image).setTimestamp(msg.createdTimestamp)] });
                });
        } catch ( ex ) {
            console.log(ex);
            return msg.reply( { embeds: [eb.setDescription('There was an error contacting the API')] });
        }
    },
});