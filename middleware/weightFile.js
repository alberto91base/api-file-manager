
const weightFile = async(ctx, next)=> {

	const data = JSON.parse(JSON.stringify(ctx.request.files));

	const imageSize = data.imageFile.size;
	if(imageSize <= 1000000){
		await next()
	}else {

		ctx.response.status = 400;
		return ctx.response.body = {
			status: "error",
			message: 'Size not permit',
			type:'size-weight'
		}
	}

}

module.exports = weightFile;