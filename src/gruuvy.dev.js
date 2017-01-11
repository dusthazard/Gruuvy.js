/*
 * ANIMATIONS IN VANILLA JAVASCRIPT
 *
 * @public object Gruuvy
 * 
 */
 
(function(g) {

  /*
   * @public function g.animate
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

  g.animate = function(elem,styles,options) {
  
    options = options ? options : {};
  
    // if no element, return
  
    if(!elem) return;
    
    // set default arguments
    
    if(!options.duration) options.duration = 450;
    if(!options.style) options.style = 'linear';
    if(!options.callback) options.callback = false;
  
    for(var i in styles) {
    
      // get the necessary attributes of the element
    
      var current = getStyle(elem,i),
           from = parseInt(current.match(/\d+/)[0]),
           to = parseInt(styles[i].match(/\d+/)[0]),
           unit = styles[i].match(/\D+/)[0];
      
      // run the animation
      
      execute(elem,i,unit,from,to,options.duration,options.style,options.callback);
      
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
              
                // stop the interval
              
                clearInterval(timer);
                
                // set the final position
                
                elem.style[style] = to+unit;
                
                // fire the callback
                
                if(callback) callback();
                
                return;
                
              }
              
              // calculate the step
              
              var t = time / duration,
                  step = from + calc[func](t) * (to-from);
              
              // update the element
              
              elem.style[style] = step+unit;
              
          },10);
          
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
      if(typeof el.style !== 'undefined' && el.style[styleProp]) return el.style[styleProp];
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
     * @desc linear animation
     * @return animation status as a %
     */
     
    linear: function (t) { 
      return t;
    },
    
    /*
     * @desc easeInQuad - accelerating animation
     * @return animation status as a %
     */
    
    easeInQuad: function (t) { 
      return t*t;
    },
    
    /*
     * @desc easeOutQuad - decelerating animation
     * @return animation status as a %
     */
    
    easeOutQuad: function (t) { 
      return 1-calc.easeInQuad(1-t);
    },
    
    // acceleration until halfway, then deceleration
    
    /*
     * @desc easeInOutQuad - accelerate until halfway point and then decelerate
     * @return animation status as a %
     */
    
    easeInOutQuad: function (t) { 
      if(t<.5) return calc.easeInQuad(t*2)/2
      return 1-calc.easeInQuad((1-t)*2)/2;
    },
    
    /*
     * @desc easeInCubic Accelerate animation
     * @return animation status as a %
     */
    
    easeInCubic: function(t) {
        return Math.pow(t,3);
    },
    
    /*
     * @desc easeOutCubic Decelerate animation
     * @return animation status as a %
     */
    
    easeOutCubic: function(t) {
        return 1-calc.easeInCubic(1-t);
    },
    
    /*
     * @desc easeInOutCubic Accelerate until halfway point and then decelerate animation
     * @return animation status as a %
     */
    
    easeInOutCubic: function(t) {
        if(t<.5) return calc.easeInCubic(t*2)/2;
        return 1-calc.easeInCubic((1-t)*2)/2;
    },
    
    /*
     * @desc easeInQuart Accelerate animation
     * @return animation status as a %
     */
    
    easeInQuart: function(t) {
        return Math.pow(t,4);
    },
    
    /*
     * @desc easeOutQuart Decelerate animation
     * @return animation status as a %
     */
    
    easeOutQuart: function(t) {
        return 1-calc.easeInQuart(1-t);
    },
    
    /*
     * @desc easeInOutQuart Accelerate until halfway point and then decelerate animation
     * @return animation status as a %
     */
    
    easeInOutQuart: function(t) {
        if(t<.5) return calc.easeInQuart(t*2)/2;
        return 1-calc.easeInQuart((1-t)*2)/2;
    },
    
    /*
     * @desc easeInQuint Accelerate animation
     * @return animation status as a %
     */
    
    easeInQuint: function(t) {
        return Math.pow(t,5);
    },
    
    /*
     * @desc easeOutQuint Decelerate animation
     * @return animation status as a %
     */
    
    easeOutQuint: function(t) {
        return 1-calc.easeInQuint(1-t);
    },
    
    /*
     * @desc easeInOutQuint Accelerate until halfway point and then decelerate animation
     * @return animation status as a %
     */
    
    easeInOutQuint: function(t) {
        if(t<.5) return calc.easeInQuint(t*2)/2;
        return 1-calc.easeInQuint((1-t)*2)/2;
    },
    
    /*
     * @desc easeInSine ease in along sine
     * @return animation status as a %
     */
    
    easeInSine: function(t) {
        return -(Math.cos(t*(Math.PI/2))) + 1;
    },
    
    /*
     * @desc easeOutSine ease out along sine
     * @return animation status as a %
     */
    
    easeOutSine: function(t) {
        return 1-calc.easeInSine(1-t);
    },
    
    /*
     * @desc easeInOutSine ease in sine until half way then ease out sine
     * @return animation status as a %
     */
    
    easeInOutSine: function(t) {
        if(t<.5) return calc.easeInSine(t*2)/2;
        return 1-calc.easeInSine((1-t)*2)/2;
    },
    
    /*
     * @desc easeInCirc ease in along a circle
     * @return animation status as a %
     */
    
    easeInCirc: function(t) {
        return -(Math.sqrt(1-t*t)-1);
    },
    
    /*
     * @desc easeOutCirc ease out along a circle
     * @return animation status as a %
     */
    
    easeOutCirc: function(t) {
        return 1-calc.easeInCirc(1-t);
    },
    
    /*
     * @desc easeInOutCirc ease in sine until half way then ease out sine
     * @return animation status as a %
     */
    
    easeInOutCirc: function(t) {
        if(t<.5) return calc.easeInCirc(t*2)/2;
        return 1-calc.easeInCirc((1-t)*2)/2;
    },
    
    /*
     * @desc easeInBack ease in along a circle
     * @return animation status as a %
     */
    
    easeInBack: function(t) {
        return t*(2.7*t-1.7);
    },
    
    /*
     * @desc easeOutBack ease out along a circle
     * @return animation status as a %
     */
    
    easeOutBack: function(t) {
        return 1-calc.easeInBack(1-t);
    },
    
    /*
     * @desc easeInOutBack ease in back until half way then ease out back
     * @return animation status as a %
     */
    
    easeInOutBack: function(t) {
        if(t<.5) return calc.easeInBack(t*2)/2;
        return 1-calc.easeInBack((1-t)*2)/2;
    },
    
    /*
     * @desc easeInElastic animation calculation
     * @return animation status as a %
     */
   
    easeInElastic: function(t){
      var p = 0.4;
      return -(Math.pow(2,10*(t-=1))) * Math.sin((t-p/4)*(2*Math.PI)/p);
    },
  
    /*
     * @desc easeOutElastic animation calculation
     * @return animation status as a %
     */
   
    easeOutElastic: function(t){
      return 1-calc.easeInElastic(1-t);
    },
    
    /*
     * @desc easeInOutElastic animation calculation
     * @return animation status as a %
     */
   
    easeInOutElastic: function(t){
      if(t<.5) return calc.easeInElastic(t*2)/2;
      return 1-calc.easeInElastic((1-t)*2)/2;
    },
    
    /*
     * @desc singleBounce required for bouncing animations
     * @return animation status as a %
     */
     
    singleBounce: function(t){
      return Math.sin(t*Math.PI)
    },
    
    /*
     * @desc easeInBounce animation calculation
     * @return animation status as a %
     */
   
    easeInBounce: function(t){
      if(t<(.08)) return calc.singleBounce(t/.08)*.07;
      if(t<(.15)) return calc.singleBounce((t-.08)/(.15-.08))*.1;
      if(t<(.4)) return calc.singleBounce((t-.15)/(.4-.15))*.22;
      return calc.singleBounce((t-.4)/(1+.2));
    },
  
    /*
     * @desc easeOutBounce animation calculation
     * @return animation status as a %
     */
   
    easeOutBounce: function(t){
      return 1-calc.easeInBounce(1-t);
    },
    
    /*
     * @desc easeInOutBounce animation calculation
     * @return animation status as a %
     */
   
    easeInOutBounce: function(t){
      if(t<.5) return calc.easeInBounce(t*2)/2;
      return 1-calc.easeInBounce((1-t)*2)/2;
    }
    
  }
  
  /*
   * @public function g.add_func
   * @desc adds a custom calculation function to the animate object
   * @param string name - name of the function (must not exist
   * @param function func - function to call (must take one arg: time)
   * @return bool - success or failure
   */
  
  g.add_func = function(name,func) {
  
    if(calc[name]) return false;
  
    calc[name] = func;
    
    return true;
  
  }

})(window.Gruuvy = window.Gruuvy || {});
