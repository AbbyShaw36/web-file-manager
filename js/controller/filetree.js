(function(window) {
	var Ctrl = function() {};

	Ctrl.prototype.getModel = function() {
		return this.treeModel;
	};

	Ctrl.prototype.show = function() {
		var _ = this;

		_.reloadTreeView();
		_.treeView.show();
	};

	Ctrl.prototype.hide = function() {
		var _  = this;

		_.treeView.hide();
	};

	Ctrl.prototype.addListener = function(listener, callback) {
		var _ = this;

		_.treeView.addListener(listener, callback);
	};

	window.FileTreeCtrl = Ctrl;
})(window);