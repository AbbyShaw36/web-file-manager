(function(window) {
	"use strict";

	function Ctrl(option) {
		if (!option.filetree || !(option.filetree instanceof FileTreeModel)) {
			throw new Error("Must provide the filetree!");
		}

		if (!option.moveFile || !FileTreeModel.isFile(option.moveFile)) {
			throw new Error("Must provide files to move!");
		}

		this.treeModel = option.filetree;
		this.moveFile = option.moveFile;
		this.$wrapper = option.$wrapper;

		init.call(this);
	}

	Ctrl.prototype = new FileTreeCtrl();
	Ctrl.prototype.constructor = Ctrl;

	function init() {
		var _ = this,
			moveFile = _.moveFile;

		_.treeView = new FileMoveView(moveFile, FileTreeModel.getFilePath(moveFile, "/", true));
		_.$wrapper.append(_.treeView.getElem());

		commonListener.call(this);
	}

	function loadTreeView(rootObj) {
		var _ = this,
			levelList = rootObj.getChildList(),
			treeView = _.treeView;

		console.log(levelList);

		for (var i = 0, len = levelList.length; i < len; i++) {
			var file = levelList[i],
				isDir = FileTreeModel.isDir(file),
				disabled = file === _.moveFile;

			if (!isDir) {
				continue;
			}

			treeView.addFile({
				file: file,
				isDir: true,
				hasChild: true,
				disabled: disabled,
				filePath: FileTreeModel.getFilePath(file, "/", true)
			});
		}
	}

	function commonListener() {
		var _ = this,
			treeView = _.treeView;

		treeView.addListener("openDir", function(file) {
			loadTreeView.call(_, file);
		});

		treeView.addListener("changeMoveTo");
	}

	Ctrl.prototype.reloadTreeView = function() {
		var _ = this;

		_.treeView.reload();
		loadTreeView.call(_, _.treeModel.getRoot());
	};

	Ctrl.prototype.resetMoveFile = function(file) {
		var _ = this;

		_.moveFile = file;
		_.treeView.resetMoveFile(file, FileTreeModel.getFilePath(file, "/", true));
	};

	Ctrl.prototype.move = function() {
		var _ = this,
			treeView = _.treeView,
			moveFile = treeView.moveFile,
			moveToDir = treeView.moveToDir;

		_.treeModel.move(moveFile, moveToDir);
	};

	window.FileMoveCtrl = Ctrl;
})(window);