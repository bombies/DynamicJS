const DatabaseUtils = require("./databaseutils");
const Constants = require("../../constants/constants");
const BotUtils = require("./botutils");

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
            const sql = `SELECT ${fields.PREFIX} FROM ${table.name} WHERE ${fields.SERVER_ID}='${gid}';`;
            this.db.all(sql, [], (err, rows) => {
                if (!err)
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
        const sql = `UPDATE ${table.name} SET ${fields.PREFIX}='${prefix}' WHERE ${fields.SERVER_ID}='${gid}';`;
        this.db.run(sql, (err) => {
            if (err)
                throw err;
        });
        return this;
    }

    static initPrefixMap() {
        const botUtils = new BotUtils();
        const serverUtils = new ServerUtils();

        botUtils.getGuilds()
            .then(guilds => {
                guilds.forEach(guild => {
                    serverUtils.getPrefix(guild)
                        .then(prefix => {
                            this.#prefixMap.set(guild, prefix);
                        })
                })
            })

        botUtils.closeConnection();
        serverUtils.closeConnection();
    }

    /**
     *
     * @param {string} gid ID of the guild
     */
    static getPrefix(gid) {
        return this.#prefixMap.get(gid);
    }

    createConnection() {
        super.createConnection(this.name);
    }
}

module.exports = ServerUtils;