(function(window) {
	"use strict";
	
	var Model = function(option) {
		option.type = "directory";
		FileModel.call(this, option);

		this.childList = [];
	};

	Model.prototype = new FileModel(this);
	Model.prototype.constructor = Model;

	Model.prototype.add = function(file, index) {
		var childList = this.childList;
		console.log(childList);

		// 如果已有，则不加入
		for (var i = 0, len = childList.length; i < len; i++) {
			if (childList[i] === file) {
				return;
			}
		}

		// 插入到 index 位置或最后
		index = index === undefined ? (childList.length) : index;
		childList.splice(index, 0, file);
		file.changeParent(this);
	};

	Model.prototype.remove = function(file) {
		var childList = this.childList;

		if (!childList || childList.length === 0) {
			return;
		}

		for (var i = childList.length - 1; i >= 0; i--) {
			if (childList[i] === file) {
				childList.splice(i, 1);
			}
		}
	};

	Model.prototype.removeAll = function() {
		var childList = this.childList;

		if (!childList || childList.length === 0) {
			return;
		}

		for (var i = childList.length - 1; i >= 0; i--) {
			this.remove(childList[i]);
		}
	};

	Model.prototype.findChild = function(index) {
		var childList = this.childList;

		if (!childList || childList.length === 0) {
			return;
		}

		return childList[index];
	};

	Model.prototype.getChildList = function() {
		return this.childList;
	};

	window.DirModel = Model;
})(window);
