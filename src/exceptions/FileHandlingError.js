class FileHandlingError extends Error {
    constructor(message = '') {
        super();
        this.name = 'FileHandlingError';
        this.message = message;
    }
}

module.exports = FileHandlingError;
FileHandlingError.prototype = Error.prototype;