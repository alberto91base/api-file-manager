class GeneralError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}

	getCode() {
		if (this instanceof BadRequest) {
			return 400;
		} if (this instanceof NotFound) {
			return 404;
		}if (this instanceof UnprocessableEntity) {
			return 422;
		}if (this instanceof PreconditionRequired) {
			return 428;
		}
		return 500;
	}
}

class BadRequest extends GeneralError {
	constructor(message,type) {
		super();
		this.message = message;
		this.type = type;
	}
}
class NotFound extends GeneralError { }
class UnprocessableEntity extends GeneralError {
	constructor(message,type) {
		super();
		this.message = message;
		this.type = type;
	}
}

class PreconditionRequired extends GeneralError {
	constructor(message,type) {
		super();
		this.message = message;
		this.type = type;
	}
}


module.exports = {
	GeneralError,
	BadRequest,
	NotFound,
	UnprocessableEntity,
	PreconditionRequired
};