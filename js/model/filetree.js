(function(window) {
	"use strict";

	function Model(rootName) {
		this.rootDir = new DirModel({ name: rootName || "root" });
		this.rootDir.parent = null;
	}

	function isDir(file) {
		return file instanceof DirModel;
	}

	function isFile(file) {
		return file instanceof FileModel;
	}

	Model.prototype.getParentWithPath = function(path) {
		var rootDir = this.rootDir,
			parentDir = rootDir;

		while(path.length) {
			parentDir = parentDir.findChild(path.shift());

			if (!parentDir || !isDir(parentDir)) {
				return false;
			}
		}

		return parentDir;
	};

	Model.prototype.loadTree = function(treeJson, split) {
		var parentDir,
			file,
			fileOption,
			filePath,
			index;

		// 默认用 “-” 分层
		split = split || "-";

		console.log(treeJson);

		for (index in treeJson) {
			fileOption = treeJson[index];
			filePath = index.split(split);
			index = filePath.pop();
			parentDir = this.getParentWithPath(filePath);

			// 如果找不到，放弃创建当前对象
			if (!parentDir) {
				continue;
			}

			if (fileOption.type === "directory") {
				file = new DirModel(fileOption);
			} else {
				file = new FileModel(fileOption);
			}

			console.log(parentDir);
			parentDir.add(file, index);
		}
	};

	Model.prototype.getTreeJson = function(split) {
		return Model.getTreeJson(this.rootDir, split);
	};

	Model.getTreeJson = function(rootDir, split) {
		var treeJson = {},
			childList = rootDir.getChildList(),
			i = 0,
			len = childList.length,
			file,
			fileData,
			index,
			childTreeJson;

		for (; i < len; i++) {
			file = childList[i];
			fileData = file.getData();
			treeJson[Model.getFilePath(file, split, true)] = fileData;

			if (isDir(file)) {
				childTreeJson = Model.getTreeJson(file, split);

				for (index in childTreeJson) {
					treeJson[index] = childTreeJson[index];
				}
			}
		}

		return treeJson;
	};

	Model.getFilePath = function(file, split, withSelf) {
		var path = [],
			parent = file.parent;

		split = split || "-";

		while (parent) {
			path.unshift(parent.name);
			parent = parent.parent;
		}

		if (withSelf) {
			path.push(file.name);
		}

		return path.join(split);
	};

	Model.prototype.getRoot = function() {
		return this.rootDir;
	};

	Model.remove = function(file) {
		var parent = file.parent;

		parent.remove(file);

		if (isDir(file)) {
			file.removeAll();
		}
	};

	Model.add = function(file, parent, index) {
		if (!isFile(file)) {
			file = file.type === "directory" ? new DirModel(file) : new FileModel(file);
		}

		parent = parent || file.parent;

		if (!isDir(parent)) {
			return;
		}

		parent.add(file, index);

		return file;
	};

	Model.prototype.move = function(file, newParent) {
		file.parent.remove(file);
		file.changeParent(newParent);
		Model.add(file);
	};

	Model.isDir = isDir;
	Model.isFile = isFile;

	window.FileTreeModel = Model;
})(window);