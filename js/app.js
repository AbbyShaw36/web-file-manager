(function(window, $) {
	var treeData = fileService.getFileList();
	var $wrapper = $(".filemg");
	var fileLevel, fileMove;

	createLevelArea(treeData, $wrapper);
	
	function createLevelArea(treeData, $wrapper) {
		fileLevel = new FileLevelCtrl({
			$wrapper: $wrapper,
			treeJson: treeData
		});

		fileLevel.addListener("moveFile", function(file) {
			fileLevel.hide();

			if (fileMove) {
				fileMove.resetMoveFile(file);
			} else {
				createMoveArea(file, $wrapper);
			}

			fileMove.show();
		});
	}

	function createMoveArea(file, $wrapper) {
		fileMove = new FileMoveCtrl({
			$wrapper: $wrapper,
			moveFile: file,
			filetree: fileLevel.getModel()
		});

		fileMove.addListener("moveFile", function() {
			fileMove.move();
			fileMove.hide();
			fileLevel.show();
		});

		fileMove.addListener("return", function() {
			fileMove.hide();
			fileLevel.show();
		});
	}
})(window, jQuery);

