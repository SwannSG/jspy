var root = (function() {

	var a = 3;

	var sub = (function() {
		
		var a = 4;
				
		return {a: a};

	})();

	return {sub: sub};
})();


