const { GeneralError,	BadRequest, NotFound, UnprocessableEntity } = require('../utils/errors');

const handlerErrors = (ctx) => {

	const err = ctx.state.error;

	if (err instanceof GeneralError) {
		ctx.status = err.getCode();
		return ctx.body = {
			status: 'error',
			message: err.message,
			type: err.type
		};
	}

	if (err instanceof Error) {
		specialErrorsAndDefault(err,ctx)
	}


	if (err instanceof BadRequest) {
		ctx.status = err.getCode();
		return ctx.body = {
			status: 'error',
			message: err.message,
			type: err.type
		};
	}

	if (err instanceof UnprocessableEntity) {
		ctx.status = err.getCode();
		return ctx.body = {
			status: 'error',
			message: err.message,
			type: err.type
		};
	}

};


const specialErrorsAndDefault = (error,ctx) => {

	if (error.code === 'LIMIT_FILE_SIZE') {
		ctx.status  = 400;
		return  ctx.body = {
			status: 'error',
			message: 'Size not permit',
			type: 'size-weight'
		};
	}else{
			ctx.status = 500;
			return ctx.body = {
				status: 'error',
				message: error.message
			};
	}
}

module.exports = handlerErrors;