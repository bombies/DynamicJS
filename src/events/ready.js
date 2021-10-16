const GeneralUtils = require('../utils/generalUtils.js');
const Event = require("../structures/event");
const Constants = require('../constants/constants');
const DatabaseUtils = require('../utils/database/databaseUtils.js');
const ServerUtils = require("../utils/database/serverUtils");
const BotUtils = require("../utils/database/botUtils");

module.exports = new Event('ready',  (client) => {
    GeneralUtils.setDefaultEmbed();
    BotUtils.initGuildList()
        .then(() => {
            ServerUtils.initPrefixMap();
        }).finally(() => {
            console.log("Bot is ready to go!");
        });
});