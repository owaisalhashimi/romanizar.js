document.addEventListener('DOMContentLoaded',function(){
	var r = new RomanizAr(document.querySelector('#editor-1'));
	var r2 = new RomanizAr(document.querySelector('#editor-2'));
	var activeEditor = r.element;
	var sidebar = document.querySelector('#usage');
	var table = sidebar.querySelector('table');
	var toggle = document.querySelector('[data-action="toggleSidebar"]');
	var selector = document.querySelector('[data-action="selectAll"]');
	var macros = [
	  {key:'/AA/',value:'\u0100',arabic:'ا'},
	  {key:'/aa/',value:'\u0101',arabic:'ا'},
	  {key:'/EE/',value:'\u012A',arabic:'ي'},
	  {key:'/ee/',value:'\u012B',arabic:'ي'},
	  {key:'/OO/',value:'\u016A',arabic:'و'},
	  {key:'/oo/',value:'\u016B',arabic:'و'},
	  {key:'/DD/',value:'\u1E0C',arabic:'ض'},
	  {key:'/dd/',value:'\u1E0D',arabic:'ض'},
	  {key:'/GG/',value:'\u0121',arabic:'غ'},
	  {key:'/gg/',value:'\u0120',arabic:'غ'},
	  {key:'/HH/',value:'\u1E24',arabic:'ح'},
	  {key:'/hh/',value:'\u1E25',arabic:'ح'},
	  {key:'/SS/',value:'\u1E62',arabic:'ص'},
	  {key:'/ss/',value:'\u1E63',arabic:'ص'},
	  {key:'/TT/',value:'\u1E6C',arabic:'ط'},
	  {key:'/tt/',value:'\u1E6D',arabic:'ط'},
	  {key:'/ZZ/',value:'\u1E92',arabic:'ظ'},
	  {key:'/zz/',value:'\u1E93',arabic:'ظ'},
	  {key:'/cc/',value:'\u02BF',arabic:'ع'},
	  {key:'/,,/',value:'\u02BE',arabic:'ء'}
	];
	macros.forEach(function(macro,i){
		var tr = document.createElement('tr');
		var tdk = document.createElement('td');
		var tdv = document.createElement('td');
		var tda = document.createElement('td');
		var kb = document.createElement('kbd');
		var k = document.createTextNode(macro.key);
		var v = document.createTextNode(macro.value);
		var a = document.createTextNode(macro.arabic);
		kb.appendChild(k)
		tdk.appendChild(kb);
		tdv.appendChild(v);
		tda.appendChild(a);
		tr.appendChild(tdk);
		tr.appendChild(tdv);
		tr.appendChild(tda);
		table.appendChild(tr);
	});
	r.extend([
		{pattern:'/slm/',text:'Al-Sal/aa/mu /cc/alaykum'},
		{pattern:'/wslm/',text:'Wa /cc/alaykum Al-Sal/aa/m'}
	]);
	toggle.onclick=toggleSidebar;
	selector.onclick=selectAll;
	document.body.onkeyup=function(e){
		if(e.keyCode===27) {
			hideSidebar();
		};
	};
	r.element.onfocus = updateActive;
	r2.element.onfocus = updateActive;
	function updateActive(e) {
		activeEditor = e.target;
	};
	function hideSidebar(e) {
		document.body.classList.remove('show-usage');
	};
	function toggleSidebar(e) {
		e.preventDefault();
		document.body.classList.toggle('show-usage');
	};
	function selectAll(e) {
		e.preventDefault();
		hideSidebar();
		if (activeEditor.focus) {
			activeEditor.focus();
		};
		document.execCommand('selectAll', false, null);
	};
});