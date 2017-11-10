(function(window, $) {
	"use strict";

	var areaTemplate = ['<div class="filetree filetree_level">',
								'<div class="filetree_wrapper">',
									'<ul class="filetree_list"></ul>',
									'<p class="filetree_empty">该文件夹为空</p>',
								'</div>',
								'<div class="filetree_toolbar">',
									'<div class="filetree_toolbar_left">当前位置：<span class="filetree_path">/root</span></div>',
									'<div class="filetree_toolbar_right">',
										'<a class="filetree_toolbar_btn disabled filetree_toolbar_btn_return" title="当前为顶级目录" href="javascript: void(0);">返回</a>',
										'<a class="filetree_toolbar_btn filetree_toolbar_btn-yellow filetree_toolbar_btn_createdir" title="新建文件夹" href="javascript: void(0);">新建文件夹</a>',
									'</div>',
								'</div>',
							'</div>'].join("");

	var listeners = {
		goIn: function(callback) {
			this.$wrapper.on("click", ".filetree_dir", function() {
				if (disabled($(this))) {
					return;
				}

				callback(fileView.getModel($(this).parent(".filetree_item")));
			});
		},
		goOut: function(callback) {
			this.$wrapper.on("click", ".filetree_toolbar_btn_return", function() {
				if(disabled($(this))) {
					return;
				}

				callback();
			});
		},
		removeFile: function(callback) {
			this.$wrapper.on("click", ".filetree_operate_delete", function() {
				if (disabled($(this))) {
					return;
				}

				var $file = $(this).parent(".filetree_operatelist").parent(".filetree_item");
				callback(fileView.getModel($file));
				fileView.remove($file);
			});
		},
		renameFile: function(callback) {
			var $wrapper = this.$wrapper;

			$wrapper.on("click", ".filetree_operate_rename", function() {
				if (disabled($(this))) {
					return;
				}

				var $file = $(this).parent(".filetree_operatelist").parent(".filetree_item");

				fileView.createRenameInput($file);
				fileView.operable($file, false);
			});

			$wrapper.on("blur", ".filetree_rename_input input", function() {
				var $file = $(this).parent(".filetree_rename_input").parent(".filetree_item");

				fileView.removeRenameInput($file);
				fileView.operable($file, true);
			});

			$wrapper.on("click", ".filetree_rename_input input", function(event) {
				event.stopPropagation();
			});

			$wrapper.on("change", ".filetree_rename_input input", function() {
				var $file = $(this).parent(".filetree_rename_input").parent(".filetree_item"),
					value = $(this).val();

				fileView.rename($file);
				fileView.operable($file, true);
				callback(fileView.getModel($file), value);
			});
		},
		createDir: function(callback) {
			var _ = this;

			this.$wrapper.on("click", ".filetree_toolbar_btn_createdir", function() {
				var dirOption = callback();

				_.addFile(dirOption);
			});
		},
		moveFile: function(callback) {
			var _ = this;

			_.$wrapper.on("click", ".filetree_operate_move", function() {
				var $file = $(this).parent(".filetree_operatelist").parent(".filetree_item");

				callback(fileView.getModel($file));
			});
		}
	};

	function View() {
		this.$wrapper = $(areaTemplate);
		this.listeners = listeners;
		this.$currentFileList = this.$wrapper.find(".filetree_wrapper>.filetree_list");
	}

	View.prototype = new FileTreeView();
	View.prototype.constructor = View;

	View.prototype.updatePath = function(path) {
		this.$wrapper.find(".filetree_path").html("/" + path);
	};

	View.prototype.emptyTree = function(isEmpty) {
		this.$wrapper.find(".filetree_wrapper").toggleClass("empty", isEmpty);
	};

	View.prototype.returnable = function(able) {
		this.$wrapper.find(".filetree_toolbar_btn_return").toggleClass("disabled", !able);
	};

	window.FileLevelView = View;

	function disabled($elem) {
		return $elem.hasClass("disabled");
	}
})(window, jQuery);