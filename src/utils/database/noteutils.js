const DatabaseUtils = require('./databaseutils');
const Constants = require("../../constants/constants");

class NoteUtils extends DatabaseUtils {
    constructor() {
        super(Constants.database.notes.NAME);
        this.name = Constants.database.notes.NAME;
        this.tables = Constants.database.notes.TABLES;
    }

    /**
     *
     * @param {string} uid ID of the user
     * @param {string} note Note to be added to the database
     * @returns This object
     */
    addNote(uid, note) {
        const userNotesTable = this.tables.USER_NOTES;
        const sql = `INSERT INTO ${userNotesTable.name} (${userNotesTable.fields.USER_ID}, ${userNotesTable.fields.NOTE}) VALUES('${uid}', '${note.toLowerCase()}');`;
        this.db.run(sql, err => {
            if (err)
                throw err;
        });
        return this;
    }

    /**
     *
     * @param {string} uid ID of the user
     * @param {string} note Note to be added to the database
     * @returns This object
     */
    removeNote(uid, note) {
        const userNotesTable = this.tables.USER_NOTES;
        const sql = `DELETE FROM ${userNotesTable.name} WHERE ${userNotesTable.fields.USER_ID}='${uid}' AND ${userNotesTable.fields.NOTE}='${note.toLowerCase()}';`;
        this.db.run(sql, err => {
            if (err)
                throw err;
        });
        return this;
    }

    /**
     * Remove all notes set by a specific user.
     * @param {string} uid ID of the user
     */
    removeAllNotes(uid) {
        const userNotesTable = this.tables.USER_NOTES;
        const sql = `DELETE FROM ${userNotesTable.name} WHERE ${userNotesTable.fields.USER_ID}='${uid}';`;
        this.db.run(sql, err => {
            if (err)
                throw err;
        });
        return this;
    }

    /**
     * Gets all the notes for a specific user
     * Note: before returning the list of guilds the database connection is closed.
     * So if it is planned to use this object again you must instantiate a new connection to
     * the database using {@link NoteUtils}#createConnection
     * @param {string} uid ID of the user
     * @returns {Promise<string[]>} Array of all the notes set by the user
     */
    async getNotes(uid) {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                const userNotesTable = this.tables.USER_NOTES;
                const notes = [];
                const sql = `SELECT ${userNotesTable.fields.NOTE} FROM ${userNotesTable.name} WHERE ${userNotesTable.fields.USER_ID}='${uid}';`;
                this.db.all(sql, [], (err, rows) => {
                    if (err)
                        throw err;

                    rows.forEach(row => notes.push(row.note));

                    resolve(notes);
                });
            }, 0);
        }));
    }
}

module.exports = NoteUtils;