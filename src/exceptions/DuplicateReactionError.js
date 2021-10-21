class DuplicateReactionError extends Error {
    constructor(message = '') {
        super();
        this.name = 'DuplicateReactionError';
        this.message = message;
    }
}

module.exports = DuplicateReactionError;
DuplicateReactionError.prototype = Error.prototype;