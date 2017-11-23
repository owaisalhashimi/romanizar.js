function romanizar(selector) {
	"use strict";
	const ptrn = new RegExp("\/[A-Z,a-z]{2,7}\/", "g");
	const replacements = {
		"/,,/": { rom:"\u02BE", ar: "ء"},
		"/AA/": { rom:"\u0100", ar: "آ"},
		"/aa/": { rom:"\u0101", ar: "آ"},
		"/EE/": { rom:"\u012A", ar: "ي"},
		"/ee/": { rom:"\u012B", ar: "ي"},
		"/OO/": { rom:"\u016A", ar: "و"},
		"/oo/": { rom:"\u016B", ar: "و"},
		"/HH/": { rom:"\u1E24", ar: "ح"},
		"/hh/": { rom:"\u1E25", ar: "ح"},
		"/KH/": { rom:"\u1E34", ar: "خ"},
		"/kh/": { rom:"\u1E35", ar: "خ"},
		"/DH/": { rom:"\u1E0E", ar: "ذ"},
		"/dh/": { rom:"\u1E0F", ar: "ذ"},
		"/SH/": { rom:"\u0160", ar: "ش"},
		"/sh/": { rom:"\u0161", ar: "ش"},
		"/SS/": { rom:"\u1E62", ar: "ص"},
		"/ss/": { rom:"\u1E63", ar: "ص"},
		"/DD/": { rom:"\u1E0C", ar: "ض"},
		"/dd/": { rom:"\u1E0D", ar: "ض"},
		"/TT/": { rom:"\u1E6C", ar: "ط"},
		"/tt/": { rom:"\u1E6D", ar: "ط"},
		"/ZZ/": { rom:"\u1E92", ar: "ظ"},
		"/zz/": { rom:"\u1E93", ar: "ظ"},
		"/cc/": { rom:"\u02BF", ar: "ع"},
		"/GH/": { rom:"\u0120", ar: "غ"},
		"/gh/": { rom:"\u0121", ar: "غ"},
		"/saw/": { rom: "\uFDFA", ar: "\uFDFA"},
		"/bsm/": { rom: "\uFDFD", ar: "\uFDFD"}
	};

	const el = document.querySelector(selector);

	const onEditListeners = [];

	el.setAttribute('contenteditable', true);
	el.classList.add('romanizar-active');

	function oninput(e) {
		const sel = window.getSelection();
		const chunk = (sel.focusNode.data) ? sel.focusNode.data.slice(Math.max(0,sel.focusOffset - 9),sel.focusOffset) : '';
		const matches = (chunk) ? chunk.match(ptrn) : '';
		if (matches) matches.forEach(replace);
	};

	function replace(match,i) {
		const sel = window.getSelection();
		const range = document.createRange();
		const replacement = (replacements[match]) ? replacements[match]['rom'] : '';
		const txt = document.createTextNode(replacement);
		range.setStart(sel.focusNode,sel.focusOffset - match.length);
		range.setEnd(sel.focusNode,sel.focusOffset);
		range.deleteContents();
		range.insertNode(txt);
		sel.empty();
		sel.addRange(range);
		sel.collapseToEnd();
		range.detach();
		if (onEditListeners[match]) {
			onEditListeners[match].forEach((fn) => {
				if (typeof(fn) == 'function') {
					fn.call(el, match);
				};
			});
		};
	};

	function onedit(match,fn) {
		if (!onEditListeners[match]) {
			onEditListeners[match] = [];
		};
		onEditListeners[match].push(fn);
	};

	function offedit(match,fn) {
		const i = (onEditListeners[match]) ? onEditListeners[match].indexOf(fn) : undefined;
		if (i!==undefined) {
			onEditListeners[match].splice(i,1);
		}
	};

	function getReplacementTable() {
		return replacements;
	};

	function extend(shortcut,rom,ar) {
		replacements[shortcut] = { rom: rom, ar: ar||'' }
	}

	el.addEventListener('input', oninput);

	return { el, onedit, offedit, extend, getReplacementTable };
};
export { romanizar };
