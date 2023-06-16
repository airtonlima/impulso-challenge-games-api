const errors = {
    VALIDATION_ERROR: 'ValidationError',
    REQUIRED_FIELD_VIOLATION: 'RequiredFieldViolation',
    INTERNAL_SERVER_ERROR: 'InternalServerError'
};

class ValidationError {
    constructor(message) {
        this.status = 400
        this.type = errors.VALIDATION_ERROR
        this.message = message;
    }
};
class RequiredFieldViolation {
    constructor(fieldname) {
        this.status = 400
        this.type = errors.REQUIRED_FIELD_VIOLATION
        this.message = `The field '${ fieldname.toUpperCase() }' is mandatory.`
    }
};
class InternalServerError {
    constructor(message = 'Internal Server Error', stack = null) {
        this.status = 500,
        this.type = errors.INTERNAL_SERVER_ERROR,
        this.message = message,
        this.stack = stack
    }
};

module.exports = {
    ValidationError,
    RequiredFieldViolation,
    InternalServerError
};