# RomanizAr

Live Arabic Transliteration in <code>contenteditable</code> elements

### Usage
```HTML
<div id="example-html-element" contenteditable="true"></div>
```


```JavaScript
var editor = new RomanizAr(document.querySelector('#example-html-element'));
```

### Works On
Used with: 
- Chrome
- Firefox
- Safari sets cursor before the inserted character, instead of after; any ideas?
Not tested on anything else.
Uses web workers for performance, but that code can easily be moved to main script.
