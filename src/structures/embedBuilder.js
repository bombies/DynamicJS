const { MessageEmbed, ColorResolvable } = require('discord.js');
const Constants = require("../constants/constants");

class EmbedBuilder extends MessageEmbed {

    static #DEFAULT_COLOR = Constants.bot.DEF_EMBED_COLOR;
    static #DEFAULT_TITLE = '';
    static #DEFAULT_FOOTER = '';
    static #DEFAULT_AUTHOR_NAME = '';
    static #DEFAULT_AUTHOR_IMAGE = '';
    static #DEFAULT_AUTHOR_LINK = '';
    static #DEFAULT_THUMBNAIL = '';

    constructor() {
        super();
        this.setColor(EmbedBuilder.#DEFAULT_COLOR);
        this.setTitle(EmbedBuilder.#DEFAULT_TITLE);
        this.setFooter({ text: EmbedBuilder.#DEFAULT_FOOTER });
        this.setAuthor({
            name: EmbedBuilder.#DEFAULT_AUTHOR_NAME,
            url: EmbedBuilder.#DEFAULT_AUTHOR_IMAGE,
            iconURL: EmbedBuilder.#DEFAULT_AUTHOR_LINK
        });
        this.setThumbnail(EmbedBuilder.#DEFAULT_THUMBNAIL);
    }

    /**
     * @param {ColorResolvable} color
     */
    static defaultColor(color) {
        EmbedBuilder.#DEFAULT_COLOR = color;
    }

    /**
     * @param {string} title
     */
    static defaultTitle(title) {
        EmbedBuilder.#DEFAULT_TITLE = title;
    }

    /**
     * @param {string} footer
     */
    static defaultFooter(footer) {
        EmbedBuilder.#DEFAULT_FOOTER = footer;
    }
    
    /**
     * @param {string} name
     * @param {string} image
     * @param {string} link
     */
    static defaultAuthor(name, image = '', link = '') {
        EmbedBuilder.#DEFAULT_AUTHOR_NAME = name;
        EmbedBuilder.#DEFAULT_AUTHOR_IMAGE = image;
        EmbedBuilder.#DEFAULT_AUTHOR_LINK = link;
    }
}

module.exports = EmbedBuilder;