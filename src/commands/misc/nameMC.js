const { lookupName } = require('namemc');

const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedBuilder");
const axios = require("axios");
const Constants = require("../../constants/constants");

module.exports = new Command({
    name: 'minecraft',
    alias: 'mc',
    help: {
        description: 'Interact with Minecraft\'s API!',
        aliases: ['nmc'],
        usage: 'nmc',
    },

    async run(message, args, client) {
        const eb = new EmbedBuilder();

        if (args.length === 0)
            return message.reply({ embeds: [eb.setDescription('You must lookup the UUID/username of a user!')] });

        const uuidRequest = await axios.get(`https://api.minetools.eu/uuid/${args[0]}`, Constants.API_HEADER);
        const requestData = uuidRequest.data;
        const uuid = requestData['id'];

        const profileRequest = await axios.get(`https://api.minetools.eu/profile/${uuid}`);
        const profileData = profileRequest.data;
        const decodedData = profileData['decoded'];
        const joinedAt = decodedData.timestamp;

        eb.setAuthor(decodedData.profileName);
        eb.setImage(decodedData.textures.SKIN.url);

        return message.reply({ embeds: [eb] });
    },
});