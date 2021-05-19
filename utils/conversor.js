

function fileUploadResponse(filesData,location) {
	let data = {};
	const files = filesData;
	for (let value in files) {
		let id = files[value][0].substring(0, files[value][0].lastIndexOf('.'));
		data[id] = files[value][1];
	}
	return data;
}


module.exports = {
	fileUploadResponse
}