function RomanizAr(node){
  var worker = new Worker('worker.js');
	var self = this;
	var pattern = /\/[aeodhstzc,]{2}\//i;
	var macros = {
  '/AA/':'\u0100',
  '/aa/':'\u0101',
  '/EE/':'\u012A',
  '/ee/':'\u012B',
  '/OO/':'\u016A',
  '/oo/':'\u016B',
  '/DD/':'\u1E0C',
  '/dd/':'\u1E0D',
  '/HH/':'\u1E24',
  '/hh/':'\u1E25',
  '/SS/':'\u1E62',
  '/ss/':'\u1E63',
  '/TT/':'\u1E6C',
  '/tt/':'\u1E6D',
  '/ZZ/':'\u1E92',
  '/zz/':'\u1E93',
  '/cc/':'\u02BF',
  '/,,/':'\u02BE'
	};
	self.element = node;
	self.element.addEventListener('keyup',function(e){
		var sel = window.getSelection();
    var range = document.createRange();
    var text = e.target.textContent||e.target.value;
    if (text=='') self.element.dataset.wordcount=0;
    worker.postMessage({
      'test': pattern,
      'subject': text
    });
    if ( /\s/.test(String.fromCharCode(e.keyCode)) ) {
      worker.postMessage({
        'get':'wordCount',
        'text': text
      });
    };
    worker.onmessage = function(me) {
      if (me.data.key) {
        range.setStart(sel.focusNode,sel.focusOffset-me.data.key[0].length);
        range.setEnd(sel.focusNode,sel.focusOffset);
        range.deleteContents();
        range.insertNode(document.createTextNode(macros[me.data.key[0]]||' '));
        sel.removeAllRanges();
        sel.addRange(range);
        sel.collapseToEnd();
      }
      if (me.data.wordCount) {
        self.element.dataset.wordcount=me.data.wordCount;
      }
    }
	});
  return self.element;
};
