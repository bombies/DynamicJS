const { ColorResolvable } = require('discord.js');

class Constants {
    static bot = {
        NAME: 'DynamicJS',
        IMAGE_URL: 'https://i.imgur.com/vYSqLoc.png',
        /**
         * @type {ColorResolvable}
         */
        DEF_EMBED_COLOR: '#eb34b4',
        MAX_BULK_DEKETE: 100
    }
    
    static pagination = {
        FRONT: 'front',
        PREVIOUS: 'previous',
        NEXT: 'next',
        END: 'end',
        FRONT_LABEL: '◂◂',
        PREVIOUS_LABEL: '◂',
        NEXT_LABEL: '▸',
        END_LABEL: '▸▸',

        HELP_PAGE_MAX: 10
    }

    static api =  {
        USER_AGENT: 'Chrome/DynamicJS / bombies#4445'
    }

    static API_HEADER = {
        headers: {
            Accept: 'application/json',
            'User-Agent': Constants.api.USER_AGENT,
        },
    }

    static database = {
        folder: 'databases',
        main: {
            NAME: 'main',
            TABLES: {
                MAIN_BOT_INFO: {
                    name: 'bot_info',
                    fields: {
                        SERVER_ID: 'server_id',
                        PREFIX: 'prefix',
                    }
                },
                MAIN_BOT_DEVELOPERS: {
                    name: 'bot_developers',
                    fields: {
                        DEVELOPER_ID: 'developer_id',
                    }
                }
            }
        }
    }
}

module.exports = Constants;