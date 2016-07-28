/**
 * @name storm-scrollto: Smooth scroll anchor links 
 * @version 0.1.0: Thu, 28 Jul 2016 16:55:36 GMT
 * @author stormid
 * @license MIT
 */(function(root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormScrollTo = factory();
  }
}(this, function() {
	'use strict';
    
    var instance,
        triggerEvents = ['click', 'keydown'],
        CONSTANTS = {
            EASING: {//https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
                easeInQuad: function (t, b, c, d) {
                    return c*(t/=d)*t + b;
                },
                easeOutQuad: function (t, b, c, d) {
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOutQuad: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInCubic: function (t, b, c, d) {
                    return c*(t/=d)*t*t + b;
                },
                easeOutCubic: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOutCubic: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
                },
                easeInQuart: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t + b;
                },
                easeOutQuart: function (t, b, c, d) {
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOutQuart: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                easeInQuint: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeOutQuint: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                },
                easeInOutQuint: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                }
            }
        },
        defaults = {
            easing: 'easeInOutCubic',
            speed: 500,//duration to scroll the entire height of the document
            offset: 0,
            pushState: true,
            callback: null
        },
        StormScrollTo = {
            init: function() {
                this.initNavItems();
                this.initListeners();
                return this;
            },
            initNavItems: function(){
                this.navItems = this.DOMElements.map(function(item){
                    return {
                        node: item,
                        target: document.querySelector(item.getAttribute('href')) || null
                    }
                });
            },
            initListeners: function(){
                this.navItems.forEach(function(el){
                    triggerEvents.forEach(function(ev){
                        el.node.addEventListener(ev, function scrollTo(e){
                            e.preventDefault();
                            this.scrollTo(el);
                        }.bind(this), false);
                    }.bind(this));
                }.bind(this));
            },
            scrollTo: function(el){
                var docHeight = Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.offsetHeight,
                        document.body.clientHeight,
                        document.documentElement.clientHeight
                    ),
                    start = window.pageYOffset,
                    end = el.target.offsetTop - this.settings.offset,
                    change = end - start,
                    duration = this.settings.speed,
                    move = function(amount) {
                        document.documentElement.scrollTop = amount;
                        document.body.parentNode.scrollTop = amount;
                        document.body.scrollTop = amount;
                    },
                    currentTime = 0,
                    increment = 16,
                    animate = function () {
                        currentTime += increment;
                        move(CONSTANTS.EASING[this.settings.easing](currentTime, start, change, duration));
                        if (currentTime < duration) {
                            window.requestAnimationFrame(animate.bind(this));
                        } else {
                            !!this.settings.callback && this.settings.callback();
                        };
                    }.bind(this);
                animate();
            },
            destroy: function(){
                this.navItems.forEach(function(el){
                    triggerEvents.forEach(function(ev){
                        el.node.removeEventListener(ev, this.scrollTo.bind(this));
                    }.bind(this));
                }.bind(this));
            }
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('ScrollTo cannot be initialised, no augmentable elements found');
        }
        
        instance = Object.assign(Object.create(StormScrollTo), {
                DOMElements: els,
                settings: Object.assign({}, defaults, opts)
            }).init();
        return instance;
    }
    
    function reload(els, opts) {
        init(els, opts);
    }
    
    function destroy() {
        instance.destroy();
        instance = null;  
    }
    
	return {
		init: init,
        reload: reload,
        destroy: destroy
	};
	
 }));