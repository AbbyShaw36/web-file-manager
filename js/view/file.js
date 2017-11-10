(function(window) {
	"use strict";

	var fileTemplate = ['<li class="filetree_item">',
							'<a class="filetree_file" href="javascript: void(0);">images</a>',
						'</li>'].join("");
	var operationWrapperTemplate = '<div class="filetree_operatelist"></div>';
	var renameInputTemplate = '<span class="filetree_rename_input"><input type="text" class="filetree_input" /></span>';
	var operationTemplate = {
		rename: '<a href="javascript: void(0);" class="filetree_operate filetree_operate_rename c_blue" title="重命名">重命名</a>',
		move: '<a href="javascript: void(0);" class="filetree_operate filetree_operate_move c_blue" title="移动">移动</a>',
		delete: '<a href="javascript: void(0);" class="filetree_operate filetree_operate_delete c_red" title="删除">删除</a>',
	};

	var fileView = {
		create: function(option) {
			var file = option.file,
				disabled = option.disabled,
				filePath = option.filePath,
				$file = $(fileTemplate);

			$file.data({
				"model": file,
				"path": filePath,
			}).find(".filetree_file").html(file.name).toggleClass("disabled", disabled || false);
			return $file;
		},
		getPath: function($file) {
			return $file.data("path");
		},
		getModel: function($file) {
			return $file.data("model");
		},
		addOperation: function($file, operationList) {
			var $operationWrapper = $file.find(".filetree_operatelist");

			$file.addClass("operable");

			if (!$operationWrapper.length) {
				$operationWrapper = $(operationWrapperTemplate);
				$file.append($operationWrapper);
			}

			$.each(operationList, function(index, value) {
				$operationWrapper.append(operationTemplate[value]);
			});
		},
		operable: function($file, operable) {
			$file.toggleClass("operable", operable);
		},
		createRenameInput: function($file) {
			var $input = $file.find(".filetree_rename_input"),
				$fileName = $file.find("a.filetree_file");

			if (!$input.length) {
				$input = $(renameInputTemplate).addClass($fileName[0].classList.toString());
				$file.append($input);
			} else {
				$input.show();
			}

			$input.find("input").val($fileName.hide().html()).focus();
			$file.removeClass("operable");
		},
		removeRenameInput: function($file) {
			var $fileName = $file.find("a.filetree_file"),
				$input = $file.find(".filetree_rename_input");

			$fileName.show();
			$input.hide();
			$file.addClass("operable");
		},
		rename: function($file) {
			var value = $file.find(".filetree_rename_input input").val(),
				$fileName = $file.find("a.filetree_file");

			$fileName.html(value);
		},
		move: function($file, $parent) {
			$parent.append($file);
		},
		remove: function($file) {
			$file.remove();
		},
		active: function($file, active) {
			$file.find(">.filetree_file").toggleClass("active", active);
		}
	};

	window.fileView = fileView;
})(window);