const path = require('path');
const uuid = require("../utils/concat.uuid");
const multer = require('koa-multer');
const fs = require('fs');
const { BadRequest } = require('../utils/errors');

const storage = multer.diskStorage({
	destination: function (req, file, callback) {

		const { location } = req.body
		const path = process.env.IMAGE_ROOT_DIRECTORY + location
		fs.mkdirSync(path, { recursive: true })
		callback(null, path);
	},

	/*
	============================================================================
	============================================================================

		esta linea se comento para poder usar sharp y redimensionar ,
		pues la imagen original solo se usara como base para las resized

		filename: (req,file,cb) => {
		  cb(null,uuid()+ path.extname(file.originalname))
		}

	============================================================================
	============================================================================
	 */



});


const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {

		if(!req.body.location){
			return cb(new BadRequest('validation data','location-required'))
		}

		let filetypes = /jpeg|jpg|png/;
		let mimetype = filetypes.test(file.mimetype);
		let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

		if (mimetype && extname) {
			return cb(null, true);
		}else{
			return cb(new BadRequest('Extension not permit','bad-image-extension'))
		}
	},
	limits: {fileSize: 3000000},
}).array('imageFile',10);

module.exports = upload;