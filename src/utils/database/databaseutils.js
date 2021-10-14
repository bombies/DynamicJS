const Constants = require('../../constants/constants');
const GeneralUtils = require('../generalutils');
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
            

        this.db = new sqlite3.Database(databasePath, (err) => {
            if (err)
                throw err;
                
            if (!dbCreated)
                this.#createTables(database);
        });
    }

    /**
     * 
     * @param {string} database 
     */
    #createTables(database) {
        switch (database) {
            case Constants.database.main.NAME:
                const mainDb = Constants.database.main;
                const tables = mainDb.TABLES;
                const sql = `CREATE TABLE ${tables.MAIN_BOT_INFO.name} (${tables.MAIN_BOT_INFO.fields.SERVER_ID} PRIMARY KEY, ${tables.MAIN_BOT_INFO.fields.PREFIX});`;
                const sql2 = `CREATE TABLE ${tables.MAIN_BOT_DEVELOPERS.name} (${tables.MAIN_BOT_DEVELOPERS.fields.DEVELOPER_ID});`
                this.db.run(sql, err => {
                    if (err)
                        throw new err;
                    console.log(`Created the ${tables.MAIN_BOT_INFO.name} table.`);
                })
                this.db.run(sql2, err => {
                    if (err)
                        throw new err;
                    console.log(`Created the ${tables.MAIN_BOT_DEVELOPERS.name} table.`);
                    
                })

                this.db.close(err => {
                    if (err)
                        throw new err;
                });
                break;
        
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
                
            if (!dbCreated)
                this.#createTables(database);
        });
    }
}

module.exports = DatabaseUtils;