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

Don't be seduced into using **any other** looping structures for arrays or strings. 

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

*arr.every()* 	returns true if every element in array satisfies a particular condition.

*arr.some()* 	returns true if at least one element in array satisfies a particular condition.

*arr.map()* 	returns an array, transforms each element in array. Very similar to Python's map function. 

*arr.filter()* 	returns an array of only selected elements in array.

*arr.forEach()* returns nothing, but something can be done on each element in array.

*arr.reduce()*	returns a single value after going through each element in array. No example shown here.


Test each and every element in an array using *some* or *every* returning a boolean.

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

Transform each and every element in an array using *map* and return an array.

```javascript
// returns new array with transformed values
// each element appears as a parameter x to the function
// old array unchanged

var arr = [11,12,13,14];

var arr_map = arr.map(function(x) {return 10*x;})
console.log(arr_map);
// 110,120,130,140
```

Filter or reduce the elements in an array using *filter* and return an array. 


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


arr.forEach(function(x) {console.log(x);})
// logs 11, 12, 13 ,14
```

Now consider a JS object that has property names. This has the form {propName1: value1, propName2: value2, ...}. Property names can be local to the object, or they may be up the prototype chain. We can loop over the property names attached to the object. But you **cannot** use the array traversing techniques.

So *for(var index=0; index < someObj.length; index++)* and *while(index < someObj.length)* are **not** usable.

The *for (var propName in someObj)* is the right construct to loop through property names on an object. The loop will iterate over all enumerable properties of the object itself and those the object inherits from its constructor's prototype. Also, this construct does not guarantee the order of property names. Which is why you don't use it for arrays.


```javascript
// define an object
var obj = {a:1, b:2, c:[1,2,3], d:{aa:1}, e: function() {}};

// use this construct to iterate over an object and get enumerable property names
// 	includes local properties directly on the object
// 	includes properties on the prototype chain
for (var propName in obj) {
    console.log(propName);
    // 'a' then 'b' then 'c' then 'd' then 'e'
}
```

If you want **only** local properties directly on the object then use these constructs.


```javascript
// define an object
var obj = {a:1, b:2, c:[1,2,3], d:{aa:1}, e: function() {}};

// if you only  want local properties
//  exclude properties on the prototype chain
var propNames = Object.keys(obj); // array of local property names
// then use standard array looping techniques

// standard while loop for array
var index = 0;
while (index<propNames.length) {
    console.log(propNames[index]);
    // 'a' then 'b' then 'c' then 'd' then 'e'
    index++;
}
// or

// standard for loop
for (var index=0; index<propNames.length; index++) {
    console.log(propNames[index]);
    // 'a' then 'b' then 'c' then 'd' then 'e'
}
```





