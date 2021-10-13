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
}

module.exports = Constants;