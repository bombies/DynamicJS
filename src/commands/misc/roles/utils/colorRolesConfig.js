const JSONConfig = require("../../../../utils/config/JSONConfig");
const Constants = require("../../../../constants/constants");
const BotUtils = require("../../../../utils/database/botUtils");
const FileHandlingError = require("../../../../exceptions/FileHandlingError");

class ColorRolesConfig extends JSONConfig {
    constructor() {
        super(Constants.json.config.files.COLORED_ROLES);
        return (() => {
            this.initConfig();
        })();
    }

    async initConfig() {
        try {
            this.makeFile();
        } catch (ex) {
            if (ex instanceof FileHandlingError) {
                this.#updateFile();
                return;
            }
        }

        let configDefault = {};
        const botUtils = new BotUtils();

        await botUtils.getGuilds()
            .then(async guilds => {
                guilds.forEach(guild => {
                    configDefault[guild] = {
                        roles: [],
                        channel_id: null,
                        message_id: null,
                    };
                });
                await this.setJSON(configDefault);
            });
    }

    #updateFile() {
        this.getJSONObject(async object => {
            const botUtils = new BotUtils();
            await botUtils.getGuilds()
                .then(guilds => {
                    guilds.forEach(guild => {
                        if (!object[guild]) {
                            object[guild] = {
                                roles: [],
                                channel_id: null,
                                message_id: null,
                            };
                        }
                    })
                }).then(async () => {
                    await this.setJSON(object)
            });

        })
    }

    /**
     * Check if the message channel for a specific guild has already been set
     * @param {string} guildID
     * @return {Promise<Boolean>} Returns true if the channel has already been initialized and vice versa.
     */
    channelIsInitAsync(guildID) {
        return new Promise(resolve => {
            this.getJSONObject(object => {
                resolve(object[guildID]['channel_id'] != null);
            });
        })
    }

    /**
     *
     * @param {string} guildID
     * @param {Function} callback
     */
    channelIsInit(guildID, callback) {
       this.getJSONObject(object => {
           callback(object[guildID]['channel_id'] != null)
       })
    }

    /**
     *
     * @param {string} guildID
     * @param {string} channelID
     * @param {Function} callback
     */
    setChannel(guildID, channelID, callback = Function()) {
        this.getJSONObject(async object => {
            object[guildID]['channel_id'] = channelID;
            await this.setJSON(object);
            callback();
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {Function} callback
     */
    getChannel(guildID, callback) {
        this.getJSONObject(object => {
            callback(object[guildID]['channel_id']);
        });
    }

    /**
     *
     * @param guildID
     * @return {Promise<string>}
     */
    async getChannelAsync(guildID) {
        return new Promise(resolve => {
            this.getJSONObject(object => {
                resolve(object[guildID]['channel_id']);
            });
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {string} messageID
     * @param {Function} callback
     */
    setMessage(guildID, messageID, callback = Function()) {
        this.getJSONObject(async object => {
            object[guildID]['message_id'] = messageID;
            await this.setJSON(object);
            callback();
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {DiscordClient} client
     * @param {Function} callback
     */
    getMessage(guildID, client, callback) {
        this.getJSONObject(async object => {
            const messageID = object[guildID]['message_id'];
            const channelID = object[guildID]['channel_id'];
            const guild = await client.guilds.fetch(guildID);
            const channel = await guild.channels.fetch(channelID);
            const message = await channel.messages.fetch(messageID);
            callback(message);
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {DiscordClient} client
     * @return {Promise<Message>}
     */
    getMessageAsync(guildID, client) {
        return new Promise(resolve => {
            this.getJSONObject(async object => {
                const messageID = object[guildID]['message_id'];
                const channelID = object[guildID]['channel_id'];
                const guild = await client.guilds.fetch(guildID);
                const channel = await guild.channels.fetch(channelID);
                const message = await channel.messages.fetch(messageID);
                resolve(message);
            });
        });
    }

    /**
     * Get the role object for a specific guild
     * @param {string} guildID
     * @param {Function} callback
     * @return {Object[]} Roles object
     */
    getRoles(guildID, callback) {
        this.getJSONObject(object => {
            callback(object[guildID]['roles'])
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {Function} callback
     */
    getReactions(guildID, callback) {
        this.getJSONObject(object => {
            const roles = [];
            object[guildID]['roles'].forEach(role => roles.push(role.reaction));
            callback(roles);
        })
    }

    /**
     *
     * @param guildID
     * @return {Promise<string[]>}
     */
    async getReactionsAsync(guildID) {
        return new Promise(resolve => {
           this.getJSONObject(object => {
               const roles = [];
               object[guildID]['roles'].forEach(role => roles.push(role.reaction));
               resolve(roles);
           })
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {string} roleID
     * @return {Promise<Object>} The object of the role
     */
    getRoleFromID(guildID, roleID) {
        return new Promise((resolve) => {
            this.getRoles(guildID, roles => {
                resolve(roles.find(role => role['id'] === roleID))
            })
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {string} reaction
     * @return {Promise<Object>}
     */
    getRoleFromReaction(guildID, reaction) {
        return new Promise((resolve) => {
            this.getRoles(guildID, roles => {
                resolve(roles.find(role => role['reaction'] === reaction))
            })
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {string} roleName
     * @param {string} roleHex
     * @param {string} roleID
     * @param {string} roleReaction
     */
    addRole(guildID, roleName, roleHex, roleID, roleReaction) {
        this.getRoles(guildID, roles => {
            roles.push({
                name: roleName,
                hex: roleHex,
                id: roleID,
                reaction: roleReaction,
            });
            this.#setObject('roles', guildID, roles);
        });
    }

    /**
     *
     * @param {string} guildID
     * @param {string} roleID
     */
    removeRole(guildID, roleID) {
        this.getRoles(guildID, roles => {
            this.getRoleFromID(guildID, roleID)
                .then(async object => {
                    const index = await this.#getIndexOfRole(guildID, roleID);
                    roles.splice(index, 1);
                    this.#setObject('roles', guildID, roles);
                })
        })

    }

    /**
     *
     * @param {string} guildId
     * @param {string} roleID
     * @return {Promise<Number>}
     */
    #getIndexOfRole(guildId, roleID) {
        return new Promise((resolve) => {
            this.getRoles(guildId, roles => {
                const specificObj = roles.find(role => role['id'] === roleID);
                resolve(roles.indexOf(specificObj));
            })
        })
    }

    /**
     *
     * @param {string} objectName
     * @param {string} guildID
     * @param {Object} newObject
     */
    #setObject(objectName, guildID, newObject) {
        this.getJSONObject(async object => {
            object[guildID][objectName.toLowerCase()] = newObject;
            await this.setJSON(object);
        })
    }

}

module.exports = ColorRolesConfig;

