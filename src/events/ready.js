const GeneralUtils = require('../utils/generalUtils.js');
const Event = require("../structures/event");
const Constants = require('../constants/constants');
const DatabaseUtils = require('../utils/database/databaseUtils.js');
const ServerUtils = require("../utils/database/serverUtils");
const BotUtils = require("../utils/database/botUtils");
const ColorRolesConfig = require("../commands/misc/roles/utils/colorRolesConfig");

module.exports = new Event('ready',  (client) => {
    GeneralUtils.setDefaultEmbed();
    BotUtils.initGuildList()
        .then(async () => {
            ServerUtils.initPrefixMap();

            const colorRolesConfig = new ColorRolesConfig();

            await colorRolesConfig.initConfig();
        }).finally(() => {
            console.log("Bot is ready to go!");
        });
});