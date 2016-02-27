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

Create a list of numbers, strings or objects. Don't forget to use the 'new' keyword when constructing the List object.
```javascript
// list of numbers
var l_num = new py.List(0,1,2,3,4,5,6,7); 

// list of strings
var l_str = new py.List('def', 'abc', 'zkl', 'bba', 'abc');

// list of objects
var l_obj = new py.List({name: 'Joe', surname: 'Bloggs', age: 25},
             			{name: 'Mary', surname: 'Knoetzen', age: 35},
            		 	{name: 'John', surname: 'James', age: 15},
             			{name: 'Jim', surname: 'van Rooyen', age: 125});
```

####count

count(value) takes a value and returns the number of times an element = value occurs in the list.

```javascript
var l = new py.List(1096, 23,4,1,1096,56,10);
var r = l.count(1096);			// returns 2
```

####append

append(value) adds an element=value to the end of the list. Equivalent of array.push(value) in javascript. 


```javascript
console.log(l)				/ [1096, 23, 4, 1, 1096, 56, 10]
l.append(22)				
console.log(l)				/ [1096, 23, 4, 1, 1096, 56, 10, 22]
```


####insert

insert(index, object) inserts 'object' at position 'index' into the list

```javascript
console.log(l)				/ [1096, 23, 4, 1, 1096, 56, 10]
l.insert(3,99)				/ [1096, 23, 4, 99, 1, 1096, 56, 10]
```

####pop

pop() with no argument removes and returns the last element from the list
pop(index) with an argument removes and returns the element at 'index' from the list

```javascript
console.log(l)				/ [1096, 23, 4, 99, 1, 1096, 56, 10]
l.pop()						/ returns 10 and list becomes [1096, 23, 4, 99, 1, 1096, 56]
l.pop(5)					/ returns 1096 and list becomes [1096, 23, 4, 99, 1, 56]
```





