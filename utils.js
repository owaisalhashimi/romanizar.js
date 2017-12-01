function wait(ms) {
	return new Promise((res,rej) => {
		setTimeout(res,ms);
	});
};

function charcount(str) {
	return str.length;
};

function wordcount(str) {
	return str.split(/[\s\.\,\;\:\!\?]/).filter(el=>el).length;
};

function txtfile(str) {
	const blob = new Blob([str], {type:'text/plain'});
	return Promise.resolve(URL.createObjectURL(blob));
};

export { wait, charcount, wordcount, txtfile };