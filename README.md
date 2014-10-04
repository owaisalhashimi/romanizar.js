# RomanizAr

Live Arabic Transliteration in <code>contenteditable</code> elements

### Usage

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