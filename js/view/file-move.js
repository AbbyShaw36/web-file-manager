(function(window, $) {
	"use strict";

	var areaTemplate = ['<div class="filetree filetree_tree">',
							'<div class="filetree_wrapper">',
								'<ul class="filetree_list"></ul>',
							'</div>',
							'<div class="filetree_toolbar">',
								'<div class="filetree_toolbar_left">',
									'移动 <span class="filetree_movefile">/root/picture/img1.jpg</span> 至 <input type="text" readonly placeholder="请在下边选择文件移动的位置" class="filetree_input filetree_moveto" />',
								'</div>',
								'<div class="filetree_toolbar_right">',
									'<a class="filetree_toolbar_btn filetree_toolbar_btn_return" title="返回" href="javascript: void(0);">返回</a>',
									'<a class="filetree_toolbar_btn filetree_toolbar_btn-yellow filetree_toolbar_btn_move disabled" title="确认" href="javascript: void(0);">确认</a>',
								'</div>',
							'</div>',
						'</div>'].join("");
	var listeners = {
		openDir: function(callback) {
			var _ = this;

			_.$wrapper.on("click", ".filetree_dir", function() {
				if (disabled($(this))) {
					return;
				}

				var $file = $(this).parent(".filetree_item"),
					$childList = $file.find(">.filetree_sublist");

				_.changeMoveTo($file);

				if (dirView.isOpen($file)) {
					dirView.close($file);
					return;
				}

				dirView.open($file);

				if (dirView.hasChild($file) && $childList.length === 0) {
					_.$currentFileList = dirView.createSublist($file);
					callback(fileView.getModel($file));
				}
			});
		},
		changeMoveTo: function() {
			var _ = this;

			_.$wrapper.on("change", ".filetree_moveto", function() {
				$(".filetree_toolbar_btn_move").toggleClass("disabled", $.trim($(this).val()) === "");
			});
		},
		moveFile: function(callback) {
			var _ = this;

			_.$wrapper.on("click", ".filetree_toolbar_btn_move", function() {
				callback();
			});
		},
		return: function(callback) {
			var _ = this;

			_.$wrapper.on("click", ".filetree_toolbar_btn_return", function() {
				callback();
			});
		}
	};

	function disabled($elem) {
		return $elem.hasClass("disabled");
	}

	function View(moveFile, moveFilePath) {
		if (!moveFile || !moveFilePath) {
			throw new Error("Must provide files to move!");
		}

		this.moveFile = moveFile;
		this.$wrapper = $(areaTemplate);
		this.$wrapper.find(".filetree_movefile").html(moveFilePath);
		this.$rootFileList = this.$wrapper.find(".filetree_wrapper>.filetree_list");
		this.$currentFileList = this.$rootFileList;
		this.listeners = listeners;
	}

	View.prototype = new FileTreeView();
	View.prototype.constructor = View;

	View.prototype.getElem = function() {
		return this.$wrapper;
	};

	View.prototype.resetMoveFile = function(moveFile, moveFilePath) {
		if (!moveFile || !moveFilePath) {
			return;
		}

		this.moveFile = moveFile;
		this.$wrapper.find(".filetree_movefile").html(moveFilePath);
	};

	View.prototype.changeMoveTo = function($dir) {
		var path = fileView.getPath($dir),
			_ = this;

		console.log(path);

		_.$wrapper.find(".filetree_moveto").val(path).change();
		_.moveToDir = fileView.getModel($dir);

		fileView.active(_.$wrapper.find(".filetree_dir"), false);
		fileView.active($dir.find(".filetree_dir"), true);
	};

	View.prototype.reload = function() {
		var _ = this;

		_.$currentFileList = _.$rootFileList;
		_.clearTree();
	};

	window.FileMoveView = View;
})(window, jQuery);