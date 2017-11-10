(function(window) {
	"use strict";

	function Model(option) {
		if (!option) {
			return;
		}
		
		this.name = option.name;
		this.type = option.type;
		this.parent = option.parent;
	}

	Model.prototype.rename = function(newName) {
		this.name = newName;
	};

	Model.prototype.changeParent = function(newParent) {
		this.parent = newParent;
	};

	Model.prototype.getData = function() {
		return {
			name: this.name,
			type: this.type
		};
	};

	window.FileModel = Model;
})(window);