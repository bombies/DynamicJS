const Constants = require("../../constants/constants");
const DatabaseUtils = require("./databaseUtils");
const config = require('../../config.json');

class BotUtils extends DatabaseUtils {
    
    constructor() {
        super(Constants.database.main.NAME);
        this.name = Constants.database.main.NAME;
        this.tables = Constants.database.main.TABLES;
    }

    /**
     *
     * @type {string[]}
     */
    static #guildList = [];

    /**
     * 
     * @param {string} gid ID of the guild
     */
    addGuild(gid) {
        "use strict";
        const table = this.tables.BOT_INFO;
        const sql = `INSERT INTO ${table.name} (${table.fields.SERVER_ID}, ${table.fields.PREFIX}) VALUES ('${gid}', '${config.prefix}');`;

        this.db.run(sql, err => {
            if (err)
                throw err;
        });
        return this;
    }

    /**
     * 
     * @param {string} gid ID of the guild
     */
    removeGuild(gid) {
        "use strict";
        const table = this.tables.BOT_INFO;
        const sql = `DELETE FROM ${table.name} WHERE ${table.fields.SERVER_ID}='${gid}';`;
        this.db.run(sql, err => {
            if (err)
                throw err;
        });
        return this;
    }

    /**
     * Gets a list of all the guilds the bot is in.
     * Note: before returning the list of guilds the database connection is closed.
     * So if it is planned to use this object again you must instanciate a new connection to 
     * the database using {@link BotUtils}#createConnection
     * @returns {Promise<string[]>} List of IDs of all the guilds the bot is in
     */
    getGuilds() {
        "use strict";
        return new Promise((resolve, reject) => {
            const table = this.tables.BOT_INFO;
            const guilds = [];
            const sql = `SELECT ${table.fields.SERVER_ID} FROM ${table.name};`;
            this.db.all(sql, [], (err, rows) => {
                if (err)
                    throw err;

                rows.forEach(row => guilds.push(row[table.fields.SERVER_ID]));
                resolve(guilds);
            });
        });
    }

    static async initGuildList() {
        "use strict";
        const botUtils = await new BotUtils();
        await botUtils.getGuilds()
            .then(guilds => {
                // botUtils.closeConnection();
                guilds.forEach(guild => BotUtils.#guildList.push(guild))
            });
    }

    /**
     * Get the cached list of guilds
     * @returns {string[]} List of guild IDs cached in the bot's memory
     */
    static getGuilds() {
        return [...BotUtils.#guildList];
    }

    /**
     *
     * @param {string} uid
     * @returns BotUtils
     */
    addDeveloper(uid) {
        const table = this.tables.BOT_DEVELOPERS;
        const sql = `INSERT INTO ${table.name}(${table.fields.DEVELOPER_ID}) VALUES('${uid}');`;

        this.db.run(sql, err => {
            if (err)
                throw err;
        })
        return this;
    }

    /**
     *
     * @param {string} uid
     * @returns {BotUtils}
     */
    removeDeveloper(uid) {
        const table = this.tables.BOT_DEVELOPERS;
        const sql = `DELETE FROM ${table.name} WHERE ${table.fields.DEVELOPER_ID}='${uid}'`

        this.db.run(sql, err => {
            if (err)
                throw err;
        })

        return this;
    }

    /**
     *
     * @returns {Promise<string[]>}
     */
    getDevelopers() {
        return new Promise(resolve => {
            const table = this.tables.BOT_DEVELOPERS;
            const sql = `SELECT * FROM ${table.name}`;
            const developers = [];

            this.db.all(sql, [], (err, rows) => {
                if (err)
                    throw err;

                rows.forEach(row => developers.push(row[table.fields.DEVELOPER_ID]))
                resolve(developers);
            })
        });
    }

    /**
     *
     * @param {string} uid
     * @returns {Promise<boolean>}
     */
    async isDeveloper(uid) {
        const developers = await this.getDevelopers();
        return developers.includes(uid);
    }

    createConnection() {
        super.createConnection(this.name);
    }
}

module.exports = BotUtils;