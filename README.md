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
Should be fine on modern browsers, but haven't tested all.
Used with:
 
- Chrome
- Firefox

Uses web workers, but that code can easily be moved to main script.
