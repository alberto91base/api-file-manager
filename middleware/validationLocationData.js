const validationLocationData = async(ctx, next)=> {

	if(ctx.request.body.location){
		await next()
	}else {

		ctx.response.status = 400;
		return ctx.response.body = {
			status: "error",
			message: 'validation data',
			type:'location-required'
		}
	}

}

module.exports = validationLocationData;