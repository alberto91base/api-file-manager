const router = require("koa-router");
const routerLocal = new  router();

module.exports = ({imageHandlerApi,handlerErrors}) => {
	routerLocal.post('/upload/image/',
		imageHandlerApi.upload,
		handlerErrors
	)
	return routerLocal;
}