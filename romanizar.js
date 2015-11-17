var romanizar = (function(el){
	"use strict";
	var whenEdited = [];
	var editHook = null;
	var editor = document.querySelector(el);
	var macros = 
	{
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
		"/gh/": "\u0121",
		"/saw/": "\uFDFA",
		"/bsm/": "\uFDFD"
	};
	editor.setAttribute("contenteditable","true");
	editor.addEventListener('input',oninput);
	function oninput(ev) {
		var sel, range;
		var matches = ev.target.textContent.match(/\/[A-Za-z,]{2,}\//g);
		if (matches) {
			expandAllMatches(matches);
		};
		clearTimeout(editHook);
		editHook = setTimeout(function(){
			whenEdited.forEach(function(fn){
				if (typeof(fn)==='function') {
					fn.call(null,matches);
				};
			});
		},500);
	};

	function expandAllMatches(matches) {
		var sel, range, text;
		matches.forEach(function(match){
			sel = window.getSelection();
			range = document.createRange();
			text = document.createTextNode(macros[match]||'');
			range.setStart(sel.focusNode,sel.focusOffset-match.length);
			range.setEnd(sel.focusNode,sel.focusOffset);
			range.deleteContents();
			range.insertNode(text);
			sel.removeAllRanges();
			sel.addRange(range);
			if (!sel.containsNode(text,false)) {
				sel.extend(text,text.length);
			};
			sel.collapseToEnd();
		});
	};


	return {
		extend: function(exts) {
			exts.forEach(function(ext){
				var val = ext.text;
				var matches = val.match(/\/[A-za-z,]{2,}\//g);
				matches.forEach(function(match){
					val = val.replace(match,macros[match]||'');
				});
				macros[ext.macro] = val;
			});
		},
		macros: function() {
			return macros;
		},
		el: editor,
		onedit: function(fn) {
			whenEdited.push(fn);
		},
		offedit: function(fn) {
			var index = whenEdited.indexOf(fn);
			if(index) delete whenEdited[index];
		}
	};

});