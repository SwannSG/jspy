## Some notes on JS if you are an old Python programer

###Looping

JS looping sucks when compared to Python.


Python loop
```python
# "something" can be anything that is iterable
# it just works
for item in something:
	doSomethingWith(item)
	# break, continue work fine 
```

JS loop is not so straightforward. The "something" impacts the type of loop to be used. 

For looping over an array or string use the following. We expect the object to have a length property like *arr.length*. *Break* and *continue* work just fine.

Don't be seduced into using any other looping structure for arrays or strings. 

```javascript
// loop works fine for string or array
var arr = [11,12,13,14];

// bulk standard for loop
for (var index= 0; index<arr.length; index++) {
    console.log(arr[index]);
    // 11,12,13,14
}

// bulk standard while loop
var index = 0
while (index<arr.length) {
	console.log(arr[index]);
	index++	
}
``` 
JS has a very elegant way of iterating over an array (not a string) without a loop. These are well worth knowing about. But you cannot use *break* or *continue* while iterating.

*arr.every()* 	returns true if every element satisfies a particular condition.
*arr.some()* 	returns true if at least one element satisfies a particular condition.
*arr.map()* 	returns an array, transforms each element. Very similar to Python's map function. 
*arr.filter()* 	returns an array of only selected elements.
*arr.forEach()* returns nothing, but something can be done on each element.
*arr.reduce()*	returns a single value after going through each element.

```javascript
// testing methods on an array without an explicit loop

var arr = [11,12,13,14];

// for every element in array function(x) must return true
// each element appears as a parameter x to the function
// test if every element is a number
var arr_every = arr.every(function(x) {if(typeof(x)==='number') {return true;} });
console.log(arr_every);
// true

// for at least one element in array  function(x) must return true
// at least one element must be a string
var arr_some = arr.some(  function(x) {if(typeof(x)==='string') {return true;} });
console.log(arr_some);
// false
```

Transform each and every element in an array using *map*.

```javascript
// returns new array with transformed values
// each element appears as a parameter x to the function
// old array unchanged

var arr = [11,12,13,14];

var arr_map = arr.map(function(x) {return 10*x;})
console.log(arr_map);
// 110,120,130,140
```

Filter or reduce the elements in an array using *filter*. 


```javascript
// returns new array with values that have passed the filter
// each element appears as a parameter x to the function
// old array unchanged

var arr = [11,12,13,14];

// allow elements that have value < 12
var arr_filter = arr.filter(function(x) {if (x<=12) {return x;}});
console.log(arr_filter);
// 11, 12
```

Do something with each element but don't actually return anything using *forEach*. Not sure exactly where this would be used.

```javascript
// returns nothing
// each element appears as a parameter x to the function

var arr = [11,12,13,14];

// logs 11, 12, 13 ,14
arr.forEach(function(x) {console.log(x);})
```













