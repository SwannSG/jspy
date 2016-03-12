#Understanding "this"


![Image of "this" logic]
(https://github.com/SwannSG/jspy/blob/master/this.svg)








When any function is invoked a **this** property is always created.

The root object also has an associated **this**. **this** and the root object are the same thing in the global execution context.

```javascript
// 'use strict' or not 'use strict' 

// in node
global===this
// true


// in browser
window===this	
// true
```


```javascript
// not 'use strict'
function f1() {
	return this;
}

f1()===this
// true
// so 'this' in f1 refers to root
```


```javascript

function f1() {
	'use strict';
	return this;
}

f1()===this
// true
// so 'this' in f1 refers to root
```


