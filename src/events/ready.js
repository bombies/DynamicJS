const GeneralUtils = require('../utils/generalUtils.js');
const Event = require("../structures/event");
const Constants = require('../constants/constants');
const DatabaseUtils = require('../utils/database/databaseUtils.js');
const ServerUtils = require("../utils/database/serverUtils");
const BotUtils = require("../utils/database/botUtils");
const ColorRolesConfig = require("../commands/misc/roles/utils/colorRolesConfig");
const ThreadLife = require('../extern-events/threadKeepAliveEvent.js');

module.exports = new Event('ready',  (client) => {
    GeneralUtils.setDefaultEmbed();
    BotUtils.initGuildList()
        .then(async () => {
            ServerUtils.initPrefixMap();

            const colorRolesConfig = new ColorRolesConfig();
            const botUtils = new BotUtils();


            // Caching the needed messages.
            const guilds = await botUtils.getGuilds();
            for (const guild of guilds) {
                colorRolesConfig.channelIsInit(guild, isInit => {
                    if (isInit) {
                        colorRolesConfig.getChannelAsync(guild)
                            .then(channelID => {
                                colorRolesConfig.getMessageAsync(guild, client)
                                    .then(message => {
                                        client.channels.cache.get(channelID).messages.cache.get(message.id);
                                    });
                            });
                    }
                });
            }

            for (let guild in guilds) {
                client.guilds.fetch(guild)
                    .then(guildObj => {
                        if (guild === '304828928223084546') {
                            let keepReactJSThreadAlive = new ThreadLife(guildObj, '909487309836140586');
                            keepReactJSThreadAlive.keepAlive();
                        }
                    });
            }
            
        }).finally(() => {
            console.log("Bot is ready to go!");
        });
});