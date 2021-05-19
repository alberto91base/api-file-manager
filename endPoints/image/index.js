const { BadRequest } = require('../../utils/errors');
const uuid = require("../../utils/concat.uuid");

module.exports = ({serviceMulter,fileUploadResponse,resizeImages}) => ({

	upload: async(ctx,next) => {

		try {

			await serviceMulter(ctx, next)
			if (ctx.req.files.length <= 0) {
				ctx.response.status = 400;
				return ctx.response.body = new BadRequest('validation data','file-required')
			}
			const ctxWithFiles = ctx;
			const nameOutPutImage = uuid();
			const dataResizeSmall = await resizeImages(ctxWithFiles, next,640,480,nameOutPutImage,'_small',false)
			const dataResizeLarge = await resizeImages(ctxWithFiles, next,1024,768,nameOutPutImage,'_large',true)
			let data = await fileUploadResponse(dataResizeLarge,ctx.req.body.location);

			ctx.response.status = 200;
			return ctx.response.body = {
				'response': data
			};

		}catch(error){
			ctx.state.error = error
			await next();
		}
	},
})