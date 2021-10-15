const DatabaseUtils = require("./databaseUtils");
const Constants = require("../../constants/constants");
const BotUtils = require("./botUtils");
const config = require('../../config.json');

class ServerUtils extends DatabaseUtils {
    constructor() {
        super(Constants.database.main.NAME);
        this.name = Constants.database.main.NAME;
        this.tables = Constants.database.main.TABLES;
    }

    /**
     *
     * @type {Map<string, string>}
     */
    static #prefixMap = new Map();

    /**
     *
     * @param {string} gid ID of the guild
     * @return {Promise<string>} Prefix of the guild
     */
    getPrefix(gid) {
        return new Promise((resolve, reject) => {
            const table = this.tables.BOT_INFO;
            const fields = table.fields;
            const sql = `SELECT * FROM ${table.name} WHERE ${fields.SERVER_ID}='${gid}';`;
            this.db.all(sql, [], (err, rows) => {
                if (err)
                    throw err;

                resolve(rows[0].prefix);
            });
        });
    }

    /**
     *
     * @param {string} gid
     * @param {string} prefix
     */
    setPrefix(gid, prefix) {
        const table = this.tables.BOT_INFO;
        const fields = table.fields;
        const sql = `UPDATE ${table.name} SET ${fields.PREFIX}='${prefix}' WHERE ${fields.SERVER_ID}=${gid};`;
        this.db.run(sql, (err) => {
            if (err)
                throw err;
        });
        ServerUtils.#prefixMap.set(gid, prefix);
        return this;
    }

    static initPrefixMap() {
        const serverUtils = new ServerUtils();
        BotUtils.getGuilds().forEach(guild => {
            serverUtils.getPrefix(guild)
                .then(prefix => {
                    // serverUtils.closeConnection();
                    ServerUtils.#prefixMap.set(guild, prefix);
                })
        });
    }

    /**
     *
     * @param {string} gid ID of the guild
     */
    static getPrefix(gid) {
        return ServerUtils.#prefixMap.get(gid);
    }

    static addGuildToPrefixMap(gid, prefix = '~') {
        ServerUtils.#prefixMap.set(gid, config.prefix);
    }

    static removeGuildFromPrefixMap(gid) {
        ServerUtils.#prefixMap.delete(gid);
    }

    createConnection() {
        super.createConnection(this.name);
    }
}

module.exports = ServerUtils;