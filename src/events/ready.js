const GeneralUtils = require('../utils/generalutils.js');
const Event = require("../structures/event");
const Constants = require('../constants/constants');
const DatabaseUtils = require('../utils/database/databaseutils.js');

module.exports = new Event('ready', (client) => {
    GeneralUtils.setDefaultEmbed();
    const testDb = new DatabaseUtils(Constants.database.main.NAME);
    console.log("Bot is ready to go!");
});