const GeneralUtils = require('../utils/generalutils.js');
const Event = require("../structures/event");

module.exports = new Event('ready', (client) => {
    GeneralUtils.setDefaultEmbed();
    console.log("Bot is ready to go!");
});