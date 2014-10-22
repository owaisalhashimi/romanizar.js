onmessage = function(e) {
	if (e.data.test && e.data.test.test(e.data.subject)) {
		var matches = e.data.subject.match(e.data.test);
		matches.forEach(function(match){
			postMessage({
				'key': match
			});
		});
	};
};