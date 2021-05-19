const validationFileData = async(ctx, next)=> {

	if(ctx.request.files && Object.keys(ctx.request.files).length > 0){
		await next()
	}else {
		ctx.response.status = 400;
		return ctx.response.body = {
				status: "error",
				message: 'validation data',
				type:'file-required'
			}
	}

}

module.exports = validationFileData;