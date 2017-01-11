# 'Vanilla' Javascript Animations and Easing Plugin

**Description:** Gruuvy is a super light weight (<3.5kb) animation plugin written in 'vanilla' Javascript, and designed to move objects around the DOM in an elegant way without using jQuery.

## Live Examples

[http://www.ericsestimate.com/vanilla-javascript-animations-easing-plugin-examples/](http://www.ericsestimate.com/vanilla-javascript-animations-easing-plugin-examples/)

*Additional code examples available in the /examples/ directory*

## Dependencies

None

## Installation

Include the javascript src file anywhere in your html document.

**Via CDN:**

```
<script src="https://cdn.rawgit.com/dusthazard/Gruuvy.js/0b76d1d917e55d0833c8f678aba7b3af93ede27a/src/gruuvy.js"></script>
```

## Configuration

Gruuvy's animation settings can be set by passing an object of options to the animate function. The options available are as follows:

```
var options = {
  duration:     450,
  style:        'easeInCubic',
  callback:     callback_function
}; 
```

## Usage

Gruuvy needs an element to animate, so the first step is to grab the variable:

```
var foo = document.querySelector('#your_awesome_element');
```

A basic animation of an element can be done by passing an object of styles to the animate function:

```
Gruuvy.animate(foo,{left: '30px'});
```

Running multiple animations is done by passing multiple variables through the styles object:

```
Gruuvy.animate(
  foo,
  {left: '30px',right: '30px'}
);
```

To change the options outlined in the configuration section, pass the options object as the third argument:

```
Gruuvy.animate(
  foo,
  {left: '30px'},
  options
);
```

## Animation Types

Current available animation types are listed below. For examples, see the live examples link above:

'linear'
'easeInQuad'
'easeOutQuad'
'easeInOutQuad'
'easeInCubic'
'easeOutCubic'
'easeInOutCubic'
'easeInQuart'
'easeOutQuart'
'easeInOutQuart'
'easeInQuint'
'easeOutQuint'
'easeInOutQuint'
'easeInSine'
'easeOutSine'
'easeInOutSine'
'easeInCirc'
'easeOutCirc'
'easeInOutCirc'
'easeInBack'
'easeOutBack'
'easeInOutBack'
'easeInElastic'
'easeOutElastic'
'easeInOutElastic'
'easeInBounce'
'easeOutBounce'
'easeInOutBounce'
