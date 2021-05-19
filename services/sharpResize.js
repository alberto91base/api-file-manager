const sharp = require("sharp");
const path = require('path');
const fs = require('fs');

const resizeImages = async (ctx, next,width,height,uuid,name,deleteOriginalFile) => {

	if (!ctx.req.files) return [];


	return await Promise.all(

		ctx.req.files.map(async file => {

			const { location } = ctx.req.body
			const nameUUID = uuid;
			const pathToNewFileResize = process.env.IMAGE_ROOT_DIRECTORY + location + '/'  + file.filename + name + path.extname(file.originalname).toLowerCase()
			const pathReturned = process.env.IMAGE_ROOT_DIRECTORY_RESPONSE + location + '/' + file.filename + name + path.extname(file.originalname).toLowerCase()
			const metadata = await sharp(file.path).metadata();

			const calcWidth  = (width,heightBase,widthBase) => {
				return Math.round(width * heightBase   / widthBase );
			}
			async function resizeImage(file,width,height,path,originalImageSize) {
				await sharp(file.path)
					.resize(width, await calcWidth(width,originalImageSize.height,originalImageSize.width))
					.toFile(path);
			}
			async function noResizeImage(file,width,height,path) {
				await sharp(file.path)
					.resize(width, height)
					.toFile(path);
			}



			if(metadata.height > 768) {
				await resizeImage(file,width,height,pathToNewFileResize,metadata);
			}else if(metadata.height <= 768 && metadata.height >= 480 ){
				if(height === 480){
					await resizeImage(file,width,height,pathToNewFileResize,metadata);
				}else{
					await noResizeImage(file,metadata.width,metadata.height,pathToNewFileResize)
				}
			}else{
				await noResizeImage(file,metadata.width,metadata.height,pathToNewFileResize)
			}

			if (deleteOriginalFile) fs.unlinkSync(file.path)

			return [file.originalname,pathReturned]

		})

	);
};

module.exports = resizeImages;