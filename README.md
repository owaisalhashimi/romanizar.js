# RomanizAr

Live Arabic Transliteration in <code>contenteditable</code> elements.

### Usage

#### Defined Macros (snippets)

| Macro | Inserts | Represents |
--------|---------|-------------
| <code>/AA/</code> | &#256; | ا |
| <code>/aa/</code> | &#257; | ا |
| <code>/EE/</code> | &#298; | ي |
| <code>/ee/</code> | &#299; | ي |
| <code>/OO/</code> | &#362; | و |
| <code>/oo/</code> | &#363; | و |
| <code>/DD/</code> | &#7692; | ض |
| <code>/dd/</code> | &#7693; | ض |
| <code>/HH/</code> | &#7716; | ح |
| <code>/hh/</code> | &#7717; | ح |
| <code>/SS/</code> | &#7778; | ص |
| <code>/ss/</code> | &#7779; | ص |
| <code>/TT/</code> | &#7788; | ط |
| <code>/tt/</code> | &#7789; | ط |
| <code>/ZZ/</code> | &#7826; | ظ |
| <code>/zz/</code> | &#7827; | ظ |
| <code>/cc/</code> | &#703; | ع |
| <code>/,,/</code> | &#702; | ء |

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

```JavaScript
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