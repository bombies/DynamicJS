const { MessageEmbed, ColorResolvable } = require('discord.js');

class EmbedBuilder extends MessageEmbed {
    /**
     * @type {ColorResolvable}
     */
    static #DEFAULT_COLOR = '';
    /**
     * @type {string}
     */
    static #DEFAULT_TITLE = '';
    /**
     * @type {string}
     */
    static #DEFAULT_FOOTER = '';

    constructor() {
        super();
        this.setColor(EmbedBuilder.#DEFAULT_COLOR);
        this.setTitle(EmbedBuilder.#DEFAULT_TITLE);
        this.setFooter(EmbedBuilder.#DEFAULT_FOOTER);
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
    static set defaultFooter(footer) {
        EmbedBuilder.#DEFAULT_FOOTER = footer;
    }
}

module.exports = EmbedBuilder;