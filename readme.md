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

Changing the duration of the animation is done with the third argument of the animate function:

```
Gruuvy.animate(
  ELEMENT,
  {left: '30px'},
  500
);
```

Different animation styles are chosen with the fourth argument of the animate function:

```
Gruuvy.animate(
  ELEMENT,
  {left: '30px'},
  500,
  'easeOutCubic'
);
```

To assign a callback function that will be called when the animation is complete, use the 5th argument:

```
Gruuvy.animate(
  ELEMENT,
  {left: '30px'},
  500,
  'easeOutCubic',
  callback
);
```

## Animation Types

Current available animation types:

'easeOutElastic'
'easeInCubic'
