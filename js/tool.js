function isArrayLike(obj) {
	return Array.isArray(obj) || typeof obj.length == "number";
}

function each(obj, callback) {
	if (isArrayLike(obj)) {
		for (var i = 0, l = obj.length; i < l; i++) {
			callback.call(obj[i], i, obj[i]);
		}
	} else {
		for (var i in obj) {
			callback.call(obj[i], i, obj[i]);
		}
	}
}