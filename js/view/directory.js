(function(window) {
	"use strict";

	var View = {
		create: function(option) {
			var dir = option.file,
				hasChild = option.hasChild,
				$dir = fileView.create(option);

			$dir.data("obj", dir).find(".filetree_file").addClass("filetree_dir").toggleClass("filetree_hasChild", hasChild);
			return $dir;
		},
		appendChild: function($dir, $file, index) {
			var $sublist = this.createSublist($dir);

			if (index === undefined) {
				$dir.push($file);
			} else {
				$sublist.find(">.filetree_item").eq(index).before($file);
			}
		},
		createSublist: function($dir) {
			var $sublist = $dir.find(">.filetree_sublist");

			if (!$sublist.length) {
				$sublist = $('<ul class="filetree_list filetree_sublist"></ul>');
				$dir.append($sublist);
				$dir.find(">.filetree_dir").addClass("filetree_hasChild");
			}

			return $sublist;
		},
		hasChild: function($dir) {
			return $dir.find(">.filetree_dir").hasClass("filetree_hasChild");
		},
		isOpen: function($dir) {
			return $dir.find(">.filetree_dir").hasClass("open");
		},
		open: function($dir) {
			$dir.find(">.filetree_dir").addClass("open");
		},
		close: function($dir) {
			$dir.find(">.filetree_dir").removeClass("open");
		}
	};

	window.dirView = $.extend({}, fileView, View);
})(window);