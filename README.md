#Storm ScrollTo

Smooth scroll anchor links 

##Usage
```
npm i -S storm-scrollto
```

```javascript
var ScrollTo = require('storm-scrollto')
ScrollTo.init('.js-scrollto');
```

```html
<nav>
    <a href="#section1" class="js-scrollto">Section 1</a>
    <a href="#section2" class="js-scrollto">Section 2</a>
    <a href="#section3" class="js-scrollto">Section 3</a>
</nav>
<section id="section1"></section>
<section id="section2"></section>
<section id="section3"></section>
```

###Options
Defaults:

```javascript
{
    easing: 'easeInOutCubic',
    speed: 260,//ms
    offset: 0,
    pushState: true,//update the URL
    focus: true,//focus on the first focusable child of the target node
    callback: null
}
``