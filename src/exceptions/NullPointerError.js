class NullPointerError extends Error {
    constructor(message = '') {
        super();
        this.name = 'NullPointerError';
        this.message = message;
    }
}

module.exports = NullPointerError;
NullPointerError.prototype = Error.prototype;