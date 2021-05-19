
const extensionFile = async(ctx, next)=> {

	const data = JSON.parse(JSON.stringify(ctx.request.files));

	const imageType = data.imageFile.type;
	if(imageType === 'image/jpeg' || imageType === 'image/png' || imageType === 'image/jpg'){
		await next()
	}else {
		ctx.response.status = 400;
		return ctx.response.body = {
			status: "error",
			message: 'Extension not permit',
			type:'bad-image-extension'
		}

	}

}

module.exports = extensionFile;