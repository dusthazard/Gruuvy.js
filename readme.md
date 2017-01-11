# Vanilla Javascript Animations Library #

**Description:** EE Animate is a super light animation plugin written in 'vanilla' Javascript.

## Live Examples

<<TKTKTK>>

## Dependencies

None

## Installation

Include the javascript src file anywhere in your html document.

**Via CDN:**

```
<script src='https://cdn.rawgit.com/dusthazard/Gruuvy/f94536e7/src/gruuvy.js'></script>
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
var ELEMENT = document.querySelector('#your_awesome_element');
```

A basic animation of an element can be done by passing an object of styles to the animate function:

```
Gruuvy.animate(ELEMENT,{left: '30px'});
```

Running multiple animations is done by passing multiple variables through the styles object:

```
Gruuvy.animate(
  ELEMENT,
  {left: '30px',right: '30px'}
);
```

To change the options outlined in the configuration section, pass the options object as the third argument:

```
Gruuvy.animate(
  ELEMENT,
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
'easeOutElastic'
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