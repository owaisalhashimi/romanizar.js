/*
 * Live Arabic transliteration in contenteditable HTML elements.
 * @author: Owais Al-Hashimi
 * @param {HTMLElement} node HTML element with attribute "contenteditable"="true".
 * @license magnet:?xt=urn:btih:cf05388f2679ee054f2beb29a391d25f4e673ac3&dn=gpl-2.0.txt GPLv2.0
 */
function RomanizAr(node) {
	'use strict';
	var worker = new Worker('/worker.js');
	var self = this;
	var pattern = /\/[A-Z,]+\//ig;
	var macros = {
		"/,,/": "\u02BE",
		"/AA/": "\u0100",
		"/aa/": "\u0101",
		"/EE/": "\u012A",
		"/ee/": "\u012B",
		"/OO/": "\u016A",
		"/oo/": "\u016B",
		"/HH/": "\u1E24",
		"/hh/": "\u1E25",
		"/KH/": "\u1E34",
		"/kh/": "\u1E35",
		"/DH/": "\u1E0E",
		"/dh/": "\u1E0F",
		"/SH/": "\u0160",
		"/sh/": "\u0161",
		"/SS/": "\u1E62",
		"/ss/": "\u1E63",
		"/DD/": "\u1E0C",
		"/dd/": "\u1E0D",
		"/TT/": "\u1E6C",
		"/tt/": "\u1E6D",
		"/ZZ/": "\u1E92",
		"/zz/": "\u1E93",
		"/cc/": "\u02BF",
		"/GH/": "\u0120",
		"/gh/": "\u0121"
	};
	RomanizAr.prototype.macros = macros;
	self.extend = function(extensions){
		extensions.forEach(function(extension){
			var matches = extension.text.match(pattern);
			matches.forEach(function(match){
				extension.text = extension.text.replace(match,self.macros[match]);
			});
			self.macros[extension.pattern] = extension.text;
		});
	};
	self.element = node;
	self.element.addEventListener('keyup', function(e) {
		var text = e.target.textContent;
		worker.postMessage({
			'test': pattern,
			'subject': text
		});
	});
	worker.onmessage = function(me) {
		if (me.data.key && (me.data.key in self.macros) ) {
			var sel = window.getSelection();
			var range = document.createRange();
			var sn = sel.focusNode;
			var so = sel.focusOffset;
			var node = document.createTextNode(self.macros[me.data.key]);
			range.setStart(sn, so - (me.data.key.length));
			range.setEnd(sn, so);
			range.deleteContents();
			range.insertNode(node);
			sel.addRange(range);
			if (!sel.containsNode(node, false)) {
				sel.extend(node, node.length);
			};
			sel.collapseToEnd();
		}
	};
	return {
		element: self.element,
		extend: self.extend
	};
};
/*
 * @license-end
 */