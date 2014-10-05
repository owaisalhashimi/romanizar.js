# RomanizAr

Live Arabic Transliteration in <code>contenteditable</code> elements.

### Usage

#### Defined Macros (snippets)

| Macro | Inserts | Represents |
--------|---------|-------------
| '/AA/' | &#256; | ا |
| '/aa/' | &#257; | ا |
| '/EE/' | &#298; | ي |
| '/ee/' | &#299; | ي |
| '/OO/' | &#362; | و |
| '/oo/' | &#363; | و |
| '/DD/' | &#7692; | ض |
| '/dd/' | &#7693; | ض |
| '/HH/' | &#7716; | ح |
| '/hh/' | &#7717; | ح |
| '/SS/' | &#7778; | ص |
| '/ss/' | &#7779; | ص |
| '/TT/' | &#7788; | ط |
| '/tt/' | &#7789; | ط |
| '/ZZ/' | &#7826; | ظ |
| '/zz/' | &#7827; | ظ |
| '/cc/' | &#703; | ع |
| '/,,/' | &#702; | ء |

#### In your HTML

```HTML
<div id="my-editor-1" contenteditable="true"></div>
...
<script src="romanizar.js"></script>
```

#### In your JavaScript

```JavaScript
var editor = new RomanizAr(document.querySelector('#my-editor-1'));
```

This is all you need for basic Arabic romanization.

### Adding Macros (snippets)

```JavaScript
editor.extend(mySnippets);
```
<code>snippets</code> must be an array of one or more objects that each define a macro __pattern__, delimted by '/', and the replacement __text__ it should expand to, for example:
```JavaAcript
var mySnippets = [
    { pattern: '/kitab/', text: 'kit/aa/b' }
];
```
Notice how the replacement text can contain existing macros, which will be expanded to their respective full texts.

Note: adding macros to any instance of RomanizAr enables them in all instances. 

### Works On

- Chrome
- Firefox
- Safari
 ~~Safari sets cursor before the inserted character, instead of after; any ideas?~~ - Fixed

No support for IE TextRange planned.

Not tested on anything else.

Uses web workers for performance, but that code can easily be moved to main script.

### License

Unlicense, see ```license.md```