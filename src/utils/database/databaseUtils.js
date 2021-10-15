const Constants = require('../../constants/constants');
const GeneralUtils = require('../generalUtils');
const sqlite3 = require('sqlite3').verbose();

class DatabaseUtils {

    /**
     * @param {string} database
     */
    constructor(database) {
        if (!GeneralUtils.dirExists(Constants.database.folder))
            GeneralUtils.mkdir(Constants.database.folder);

        const databasePath = `./${Constants.database.folder}/${database}.db`;
        let dbCreated = true;

        if (!GeneralUtils.dirExists(databasePath)) {
            GeneralUtils.createNewFile(databasePath);
            console.log(`${database}.db created!`);
            dbCreated = false;
        }

        /**
         *
         * @type {sqlite3.Database}
         */
        this.db = new sqlite3.Database(databasePath, async (err) => {
            if (err)
                throw err;

            if (!dbCreated)
                await this.#createTables(database);
        });
    }

    /**
     * 
     * @param {string} database 
     */
    #createTables(database) {
        switch (database) {
            case Constants.database.main.NAME: {
                const mainDb = Constants.database.main;
                const tables = mainDb.TABLES;
                const sql = `CREATE TABLE ${tables.BOT_INFO.name} (${tables.BOT_INFO.fields.SERVER_ID} TEXT PRIMARY KEY, ${tables.BOT_INFO.fields.PREFIX} TEXT);`;
                const sql2 = `CREATE TABLE ${tables.BOT_DEVELOPERS.name} (${tables.BOT_DEVELOPERS.fields.DEVELOPER_ID} TEXT);`
                this.db.run(sql, err => {
                    if (err)
                        throw new err;
                })

                this.db.run(sql2, err => {
                    if (err)
                        throw new err;
                })

                this.db.close(err => {
                    if (err)
                        throw new err;
                });
            } break;
            case Constants.database.notes.NAME: {
                const notesDb = Constants.database.notes;
                const tables = notesDb.TABLES;
                const sql = `CREATE TABLE ${tables.USER_NOTES.name} (${tables.USER_NOTES.fields.USER_ID} TEXT, ${tables.USER_NOTES.fields.NOTE} TEXT);`
                this.db.run(sql, err => {
                    if (err)
                        throw err;
                })
                this.db.close();
            } break;
            default:
                throw new Error(`${database} is an invalid database`);
        }
    }

    closeConnection() {
        this.db.close();
    }

    /**
     * 
     * @param {string} database 
     */
    createConnection(database) {
        const databasePath = `./${Constants.database.folder}/${database}.db`;
        this.db = new sqlite3.Database(databasePath, (err) => {
            if (err)
                throw err;
        });
    }
}

module.exports = DatabaseUtils;