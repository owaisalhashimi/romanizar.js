/**!
 * Live Arabic transliteration in contenteditable HTML elements.
 * @author: Owais Al-Hashimi
 * @param {HTMLElement} node HTML element with atribute "contenteditable"="true".
 * @license magnet:?xt=urn:btih:cf05388f2679ee054f2beb29a391d25f4e673ac3&dn=gpl-2.0.txt GPLv2.0
 */
function RomanizAr(node) {
	'use strict';
	var worker = new Worker('/worker.js');
	var self = this;
	var pattern = /\/[\w,]+\//ig;
	var macros = {
		'/AA/': '\u0100',
		'/aa/': '\u0101',
		'/EE/': '\u012A',
		'/ee/': '\u012B',
		'/OO/': '\u016A',
		'/oo/': '\u016B',
		'/DD/': '\u1E0C',
		'/dd/': '\u1E0D',
		'/HH/': '\u1E24',
		'/hh/': '\u1E25',
		'/SS/': '\u1E62',
		'/ss/': '\u1E63',
		'/TT/': '\u1E6C',
		'/tt/': '\u1E6D',
		'/ZZ/': '\u1E92',
		'/zz/': '\u1E93',
		'/cc/': '\u02BF',
		'/,,/': '\u02BE'
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
		if (text === '') self.element.dataset.wordcount = 0;
		worker.postMessage({
			'test': pattern,
			'subject': text
		});
		if (/\s/.test(String.fromCharCode(e.keyCode))) {
			worker.postMessage({
				'get': 'wordCount',
				'text': text
			});
		}
	});
	worker.onmessage = function(me) {
		var sel = window.getSelection();
		var range = document.createRange();
		if (me.data.key) {
			var sn = sel.focusNode;
			var so = sel.focusOffset;
			var node = document.createTextNode(self.macros[me.data.key[0]] || ' ');
			range.setStart(sn, so - (me.data.key[0].length));
			range.setEnd(sn, so);
			range.deleteContents();
			range.insertNode(node);
			sel.addRange(range);
			if (!sel.containsNode(node, false)) {
				sel.extend(node, node.length);
			};
			sel.collapseToEnd();
		}
		if (me.data.wordCount) {
			self.element.dataset.wordcount = me.data.wordCount;
		}
	};
	return {
		element: self.element,
		extend: self.extend
	};
};
/**
 * @license-end
 */