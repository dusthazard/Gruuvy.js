/*
 * ANIMATIONS IN VANILLA JAVASCRIPT
 *
 * @public object ee
 * 
 */
 
(function(ee) {

  /*
   * @public function ee.animate
   * @desc animates an element's style from x to y
   * @param element elem - element to be animated
   * @param string style - css style to run the animation on
   * @param string unit - unit that will be appended to the style value (ex. px,%,vw)
   * @param int from - starting value for the animation 
   * @param int to - ending value for the animation 
   * @param int duration - time in ms how long the animation will take
   * @param string func - the type of animation to be used
   * @param function callback - callback function for when animation is complete
   * @returns nothing
   */

  ee.animate = function(elem,styles,duration = 450,func = 'easeOutCubic',callback = false) {
  
    // if no element, return
  
    if(!elem) return;
  
    for(var i in styles) {
    
      // get the necessary attributes of the element
    
      var current = getStyle(elem,i),
           from = parseInt(current.match(/\d+/)[0]),
           to = parseInt(styles[i].match(/\d+/)[0]),
           unit = styles[i].match(/\D+/)[0];
      
      // run the animation
      
      execute(elem,i,unit,from,to,duration,func,callback);
      
    }
    
  };
  
  /*
   * @desc execute the animation
   * @param element elem - element to be animated
   * @param string style - css style to run the animation on
   * @param string unit - unit that will be appended to the style value (ex. px,%,vw)
   * @param int from - starting value for the animation 
   * @param int to - ending value for the animation 
   * @param int duration - time in ms how long the animation will take   
   * @param string func - the type of animation to be used
   * @param function callback - callback function for when animation is complete   
   * @returns nothing   
   */
  
  var execute = function(elem,style,unit,from,to,duration,func,callback) {
  
    var start = new Date().getTime(),
         timer = setInterval(function() {
         
              // determine how long the animation has been going
          
              var time = new Date().getTime() - start;
              
              // if the animation is complete
              
              if( time >= duration ) {
              
                clearInterval(timer);
                
                window[callback]();
                
              }
              
              // calculate the step
              
              var t = time / duration,
                  step = from + calc[func](t) * (to-from);
              
              // update the element
              
              elem.style[style] = step+unit;
              
          },25);
          
      // assign the initial starting point
          
      elem.style[style] = from+unit;
  
  };
  
  /*
   * @desc get the calculated style of an element
   * @param element el - the element to investigate
   * @param string styleProp - the style prop to read
   */
  
  var getStyle = function(el, styleProp) {
      // check for an inline style
      if(el.style[styleProp]) return el.style[styleProp];
      // if none, continue
      var value, defaultView = (el.ownerDocument || document).defaultView;
      // W3C standard way:
      if (defaultView && defaultView.getComputedStyle) {
          // sanitize property name to css notation
          // (hyphen separated words eg. font-Size)
          styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
          return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
      } else if (el.currentStyle) { // IE
          // sanitize property name to camelCase
          styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
              return letter.toUpperCase();
          });
          value = el.currentStyle[styleProp];
          // convert other units to pixels on IE
          if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
              return (function(value) {
                  var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                  el.runtimeStyle.left = el.currentStyle.left;
                  el.style.left = value || 0;
                  value = el.style.pixelLeft + "px";
                  el.style.left = oldLeft;
                  el.runtimeStyle.left = oldRsLeft;
                  return value;
              })(value);
          }
          return value;
      }
  };
  
  /*
   * @desc object that holds all animation calculation functions
   */
   
  var calc = {
  
    /*
     * @desc EaseOut Elastic animation calculation
     * @return animation status as a %
     */
   
    easeOutElastic: function(t){
      var p = 0.7;
      return Math.pow(2,-10*t) * Math.sin((t-p/4)*(2*Math.PI)/p) + 1;
    },
    
    /*
     * @desc EaseIn Cubic animation calculation
     * @return animation status as a %
     */
    
    easeInCubic: function(t) {
        return Math.pow(t,3);
    }
    
  }
  
  /*
   * @public function ee.add_func
   * @desc adds a custom calculation function to the animate object
   * @param string name - name of the function (must not exist
   * @param function func - function to call (must take one arg: time)
   * @return bool - success or failure
   */
  
  ee.add_func = function(name,func) {
  
    if(calc[name]) return false;
  
    calc[name] = func;
    
    return true;
  
  }

})(window.Gruuvy = window.Gruuvy || {});
