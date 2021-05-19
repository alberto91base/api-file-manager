const serviceFTP = require('./ftp-service');
const serviceMulter = require('./multer');
const resizeImages = require('./sharpResize')

module.exports = {
	serviceFTP,
	serviceMulter,
	resizeImages
};