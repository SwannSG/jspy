# py_lite.js

The idea behind py_lite is to implement some useful Python functionality. If you are familiar with the Python style of doing something, using the same paradigm can help with productivity

###Getting Started

Include py_lite.js and lodash.js (underscore should be plug compatible with lodash.js but this has not been tested). The dependency is very small and the only functions used are _.isEqual(x,y) and _.isArray(arr) to check the equivalence of two objects.

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

*count(value)* takes a value and returns the number of times an element = value occurs in the list.

```javascript
var l = new py.List(1096, 23,4,1,1096,56,10);
var r = l.count(1096);			// returns 2
```

####append

*append(value)* adds an element=value to the end of the list. Equivalent of array.push(value) in javascript. 


```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10)	
console.log(l)
// [1096, 23, 4, 1, 1096, 56, 10]
l.append(22)				
console.log(l)
// [1096, 23, 4, 1, 1096, 56, 10, 22]

```


####insert

*insert(index, object)* inserts 'object' at position 'index' into the list

```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10)	
console.log(l)
// [1096, 23, 4, 1, 1096, 56, 10]
l.insert(3,99)
console.log(l);
// [1096, 23, 4, 99, 1, 1096, 56, 10]
```

####pop

*pop()* with no argument removes and returns the last element from the list

*pop(index)* with an argument removes and returns the element at 'index' from the list

```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10)
console.log(l)
// [1096, 23, 4, 99, 1, 1096, 56, 10]
l.pop()
// returns 10 and list l becomes [1096, 23, 4, 99, 1, 1096, 56]
l.pop(5)
// returns 1096 and list l becomes [1096, 23, 4, 99, 1, 56]
```

####remove

*remove(value)* removes the first element found in the list where element=value. Nothing is returned.

```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10)
console.log(l)
// [1096, 23, 4, 99, 1, 1096, 56, 10]
l.remove(1096);
// [23, 4, 99, 1, 1096, 56, 10]
```

####reverse

*reverse()* reverses the order of the list.

```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10);
console.log(l);
// [1096, 23, 4, 99, 1, 1096, 56, 10]
l.reverse();
console.log(l);
// [10, 56, 1096, 1, 99, 4, 23, 1096]
```


####sort

*sort()* is the most complex of the List methods. It is important to keep in mind what the sort_key is. The sort_key must be a Javascript primitive i.e. number, string or boolean or a combination of these.

We do make allowance for sorting reliably on "simple" objects as a convenience and this is shown later. "Simple" is an object with a single propertyName and value. 

Where very powerful sort and compare functionality is required there is an option to provide this as a parameter to *sort(sortObj)*. This is a very useful capability and provides a solution for almost any sort requirement.

Simple sort
```javascript
// create new list 'l'
var l = new py.List(1, 4, 10, 23, 56, 99, 1096, 1096, 'a', 'b', 'c', 'd', '1a');
console.log(l);
// [1, 4, 10, 23, 56, 99, 1096, 1096, 'a', 'b', 'c', 'd', '1a']
l.sort();
console.log(l);
[1, 4, 10, 23, 56, 99, 1096, 1096, '1a', 'a', 'b', 'c', 'd']
```

Sort on a simple object with a single key-value pair. By default we use the key in the key-value pair as the sort key. So in an object {someKey: 200} we will have *sort_key='someKey'*, not *sort_key=200*. This behaviour can be changed by passing a *sortObj* to *sort(sortObj)*.

```javascript
// create new list 'l'
var l = new List({z:1}, {abc:5}, {w:24}, {z:1},{wer: 'a'}, {rus:'b'}, {vuw:'c'})
console.log(l);
// [{z:1}, {abc:5}, {w:24}, {z:1},{wer: 'a'}, {rus:'b'}, {vuw:'c'}]
l.sort()
// sort is uses z, abc, w, z, wer, rus, vuw as the sort_key
console.log(l);
// [{'abc': 5}, {'rus': 'b'}, {'vuw': 'c'}, {'w': 24}, {'wer': 'a'}, {'z': 1}, {'z': 1}]
```

An importand word of caution. Where the objects in the list have more than one property {property1: value, property2:value} do not use *sort()*. This is because the property order in a Javascrript object is not guaranteed. So  {property1: value, property2:value} can arbitrarily become {property2: value, property1:value} and then the simple sort, which picks up the first property name on the object as the key, will not work correctly. To solve this we use *sort(sortObj)* on a complex object.

*sortObj* is an object literal and has the form
```javascript
var sortObj = {cmp: '',	// compare function or use default compare function
			   key: function(x) {return doSomethingToGetSortKeyWhichMustBeAPrimitive;},
			   reverse: false}	
```

*sortObj.cmp* is the desired compare function. Most of the time this can be set to an empty string as the default compare works fine.

*sortObj.key* is a function that returns the sort_key to be used **which must be a primitive**. The function is implicitly passed each object in the list as an argument.


Sort on an object with more than one property.
```javascript
// create new list 'l'
var l = new List({name: 'Joe', surname: 'Bloggs', age: 25},
        		 {name: 'Mary', surname: 'Knoetzen', age: 35},
        		 {name: 'John', surname: 'James', age: 15},
        		 {name: 'Jim', surname: 'van Rooyen', age: 125})
				 {name:"Alfred", surname:"James", age:65})
// we now have a list of objects
l.sort({cmp:'', key: function(x) {return x.surname + x.name;}, reverse:true});
/*
 cmp='' 		means use the default compare function
 key			take parameter x which is an object in the list.
					For example the first object will be x = {name: 'Joe', surname: 'Bloggs', age: 25}.
					Then return x.surname + x.name --> 'BloggsJoe' which becomes the value of the sort_key
 reverse: true	reverse the order of the list after the sorting is completed
*/
console.log(l);
// [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
//  {name:"John", surname:"James", age:15}, {name:"Alfred", surname:"James", age:65},
//  {name:"Joe", surname:"Bloggs", age:25}]
```

The default sort method for *sort()* is shown below. When *sortObj.cmp=''* then this default sort method is used. It seems to work fine for most scenarios.

```javascript
var basicPrimitiveCmp = function(a,b) {
    /*
     values a,b must be primitives
     sorts numeric ascending,
     sorts characters alphabetically
     */
    if (a < b) {
        // a before b
        return -1;
    }
    else if (a > b) {
        // b before a
        return 1;
    }
    else {
        // a == b
        return 0;
    }
}
```

####extend

*extend(x)* extends the list. x can either be a set of comma separated values or another List object. 


Example of *extend* with comma separated values'
```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10)
console.log(l)
// [1096, 23, 4, 99, 1, 1096, 56, 10]
l.extend(15, 16, 17);
console.log(l);
// [1096, 23, 4, 99, 1, 1096, 56, 10, 15, 16, 17]
```

Example of *extend* with another List object.
```javascript
// create new list 'l'
var l = new py.List(1096, 23, 4, 1, 1096, 56, 10)
console.log(l)
// [1096, 23, 4, 99, 1, 1096, 56, 10]
var l2 = new py.List(15, 16, 17)
l.extend(l2);
console.log(l);
// [1096, 23, 4, 99, 1, 1096, 56, 10, 15, 16, 17]
```

###sorted

This is equivalent to the Python sorted function except that it returns a List object.

*sorted(somethingIterable)* to invoke. 

If *somethingIterable* isn't iterable sorted will return false. Things that are not iterable are a null, boolean, number or a function.

Things that are iterable are arrays, strings, List and an object. In this context an object is something of the form {propertyName1: value1, propertyName1: valu2, ...}. When sorted is applied to an object of this form it returns a List with the *propertNames* in alphabetical order. 

*sorted* can also take a second *sortObj* parameter. We call *sorted(somethingIterable, sortObj)*. The use of the *sortObj* is described in [sort](#sort).


Example of *sorted('someString')*
```javascript
var result = sorted('someString');
console.log(result.arr);
// ['S', 'e', 'g', 'i', 'm', 'n', 'o', 'r', 's', 't']
```

Example of *sorted('someArray')*
```javascript
// array of numbers
var result = sorted([4,2,8,9,23]);
console.log(result.arr);
// [2, 4, 8, 9, 23]

// array of single property (simple) objects
var result = sorted([{z:1}, {z:1}, {wer:"a"}, {w:24}, {vuw:"c"}, {rus:"b"}, {abc:5}]);
console.log(result.arr);
// [{abc:5}, {rus:"b"}, {vuw:"c"}, {w:24}, {wer:"a"}, {z:1}, {z:1}]

// array of objects and using sortObj = {cmp:'', key: function(x) {return x.surname;}, reverse:true}
var result = py.sorted([{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
						{name:"John", surname:"James", age:15}, {name:"Joe", surname:"Bloggs", age:25},
						{name:"Alfred", surname:"James", age:65}], {cmp:'', key: function(x) {return x.surname;}, reverse:true});
console.log(result.arr);
// [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
// {name:"Alfred", surname:"James", age:65}, {name:"John", surname:"James", age:15},
// {name:"Joe", surname:"Bloggs", age:25}]
```

Example of *sorted(someObject)*
```javascript
result = py.sorted({name:"Jim", surname:"van Rooyen", age:125});
console.log(result.arr);
// ['age', 'name', 'surname']
```






