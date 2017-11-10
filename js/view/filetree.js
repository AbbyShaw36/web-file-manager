(function(window, $) {
	"use strict";

	function View() {};

	View.prototype.getElem = function() {
		return this.$wrapper;
	};

	View.prototype.addFile = function(option) {
		var isDir = option.isDir,
			operation = option.operation,

			$fileList = this.$currentFileList,
			optionList = [],
			$file;

		if (isDir) {
			$file = dirView.create(option);
		} else {
			$file = fileView.create(option);
		}

		if (operation && operation.length) {
			fileView.addOperation($file, operation);
		}

		$fileList.append($file);
	};

	View.prototype.addListener = function(listener, callback) {
		this.listeners[listener].call(this, callback);
	};

	View.prototype.clearTree = function() {
		this.$currentFileList.html("");
	};

	View.prototype.show = function() {
		this.$wrapper.show();
	};

	View.prototype.hide = function() {
		this.$wrapper.hide();
	};

	window.FileTreeView = View;
})(window, jQuery);