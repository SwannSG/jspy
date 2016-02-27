# py_lite.js

The idea behind py_lite is to implement some useful Python functionality. If you are familiar with the Python style of doing something, using the same paradigm can help with productivity

###Getting Started

Include py_lite.js and lodash.js (underscore should be plug compatible with lodash.js but this has not been tested). The dependency is very small and the only function used is _.isEqual(x,y) to check the equivalence of two objects.

```html
<!DOCTYPE html>
<html>
    <head lang="en">
        <meta charset="UTF-8">
        <script src="py_lite.js"></script>		// needed
        <script src="lodash.js"></script>		// needed
        <title>Test py_lite library</title>
    </head>
    <body>
        <p>Test library loading</p>
    </body>
</html>
```

By default py_lite.js creates a global name, attached to 'window' in the browser, of 'py'.

###List

The List constructor implements a Python list like object. All [Python's list methods](https://docs.python.org/2/tutorial/datastructures.html) are implemented.  

Create a list of numbers, strings or objects.
```javascript
var l_num = new py.List(0,1,2,3,4,5,6,7); 
var l_str = new py.List('def', 'abc', 'zkl', 'bba', 'abc');
var l_obj = new py.List({name: 'Joe', surname: 'Bloggs', age: 25},
             			{name: 'Mary', surname: 'Knoetzen', age: 35},
            		 	{name: 'John', surname: 'James', age: 15},
             			{name: 'Jim', surname: 'van Rooyen', age: 125});
```

