onmessage=function(e) {
	var key;
	if (e.data.test&&e.data.test.test(e.data.subject)) {
		postMessage({
			'key': e.data.subject.match(e.data.test)
		});
	};
	if (e.data.get&&e.data.get==='wordCount') {
		postMessage({
			'wordCount': e.data.text.match(/\S+\s*/g).length||0
		});
	};
}