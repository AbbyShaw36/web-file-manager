(function(window) {
	"use strict";

	var newDirObj = {
		name: "新建文件夹",
		type: "directory"
	};

	function Ctrl(option) {
		var _ = this;

		_.rootName = option.rootName;
		_.$wrapper = option.$wrapper;
		_.treeJson = option.treeJson;
		_.treeJsonSplit = option.treeJsonSplit;
		_.operation = ["rename", "move", "delete"];
		init.call(this);
	}

	function addCommonListener() {
		var _ = this,
			treeView = _.treeView;

		treeView.addListener("goIn", function(file) {
			_.currentLevel = file;
			_.reloadTreeView();
		});

		treeView.addListener("goOut", function() {
			_.currentLevel = _.currentLevel.parent;
			_.reloadTreeView();
		});

		treeView.addListener("removeFile", function(file) {
			FileTreeModel.remove(file);
			_.checkEmpty();
			console.log(_.currentLevel);
		});

		treeView.addListener("renameFile", function(file, newName) {
			file.rename(newName);
			console.log(file);
		});

		treeView.addListener("createDir", function() {
			var file = FileTreeModel.add(newDirObj, _.currentLevel);
			_.checkEmpty();
			
			return {
				file: file,
				operation: _.operation,
				isDir: true
			};
		});
	}

	Ctrl.prototype = new FileTreeCtrl();
	Ctrl.prototype.constructor = Ctrl;

	function init() {
		var _ = this,
			treeModel,
			treeJson = _.treeJson;

		// model
		if (treeJson instanceof FileTreeModel) {
			treeModel = treeJson;
			treeJson = treeModel.getTreeJson(_.treeJsonSplit);
		} else {
			treeModel = new FileTreeModel();
		}

		_.treeModel = treeModel;
		_.treeJson = treeJson;
		treeModel.loadTree(treeJson, _.treeJsonSplit);
		_.currentLevel = treeModel.getRoot();
		console.log(_.currentLevel);
			
		// view
		var treeView = new FileLevelView(_.rootName);
		_.treeView = treeView;
		_.$wrapper.append(treeView.getElem());
		loadTreeView.call(this);

		addCommonListener.call(this);
	}

	function loadTreeView() {
		var _ = this,
			rootObj = _.currentLevel,
			levelList = rootObj.getChildList(),
			treeView = _.treeView;

		for (var i = 0, len = levelList.length; i < len; i++) {
			var file = levelList[i];

			treeView.addFile({
				file: file,
				isDir: FileTreeModel.isDir(file),
				operation: _.operation
			});
		}

		_.checkEmpty();
		treeView.returnable(rootObj !== _.treeModel.getRoot());

		_.loadPathView();
	}

	Ctrl.prototype.checkEmpty = function() {
		var _ = this;

		_.treeView.emptyTree(_.currentLevel.getChildList().length === 0);
	};

	Ctrl.prototype.reloadTreeView = function() {
		var _ = this;

		_.treeView.clearTree();
		loadTreeView.call(this);
	};

	Ctrl.prototype.loadPathView = function() {
		var _ = this,
			path = FileTreeModel.getFilePath(_.currentLevel, "/", true);

		_.treeView.updatePath(path);
	};

	window.FileLevelCtrl = Ctrl;
})(window);