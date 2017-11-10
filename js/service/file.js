var fileService = {
	getFileList: function() {
		return {
			"0": {
				name: "documents",
				type: "directory",
				fileList: []
			},
			"1": {
				name: "music",
				type: "directory",
				fileList: []
			},
			"2": {
				name: "pictures",
				type: "directory",
				fileList: []
			},
			"2-0": {
				name: "img1.jpg",
				type: "jpg"
			}
		};
	}
};