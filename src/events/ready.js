const GeneralUtils = require('../utils/generalutils.js');
const Event = require("../structures/event");
const Constants = require('../constants/constants');
const DatabaseUtils = require('../utils/database/databaseutils.js');
const ServerUtils = require("../utils/database/serverutils");
const BotUtils = require("../utils/database/botutils");

module.exports = new Event('ready',  (client) => {
    BotUtils.initGuildList()
        .then(() => {
            ServerUtils.initPrefixMap();
        }).finally(() => {
            console.log("Bot is ready to go!");
        });
});