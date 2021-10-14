const Constants = require("../../constants/constants");
const DatabaseUtils = require("./databaseutils");
const config = require('../../config.json');

class BotUtils extends DatabaseUtils {
    
    constructor() {
        super(Constants.database.main.NAME);
        this.name = Constants.database.main.NAME;
        this.tables = Constants.database.main.TABLES;
    }

    /**
     * 
     * @param {string} gid ID of the guild
     */
    addGuild(gid) {
        const table = this.tables.BOT_INFO;
        const sql = `INSERT INTO ${table.name} (${table.fields.SERVER_ID}, ${table.fields.PREFIX}) VALUES (${gid}, ${config.prefix});`;
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
     * @returns {string[]} List of IDs of all the guilds the bot is in
     */
    getGuilds() {
        const table = this.tables.BOT_INFO;
        const guilds = [];
        const sql = `SELECT ${table.fields.SERVER_ID} FROM ${table.name};`;
        this.db.all(sql, [], (err, rows) => {
            if (err)
                throw err;
            
            rows.forEach(row => guilds.push(row.server_id));
        });
        this.closeConnection();
        return guilds;
    }

    createConnection() {
        super.createConnection(this.name);
    }
}

module.exports = BotUtils;