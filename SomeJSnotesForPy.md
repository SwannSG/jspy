## Some notes on JS if you are an old Python programer

###Iterating (looping) Over Something

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



####Looping over an array or string

For looping over an array or string use the following. We expect the object to have a length property like *arr.length*. *break* and *continue* work just fine.

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

Actually, we now have another useful looping structure, know as **for of** (returns the values) versus **for in** (returns the index). **for of** is most Python like. 

```javascript
// loop works fine for string or array
var arr = [11,12,13,14];

// "for in"  loop
for (each in arr) {
    console.log(each);
    // 0,1,2,3
}

// "for of"  loop
for (each of arr) {
    console.log(each);
    // [11,12,13,14]
}
``` 


####Iterating over an array without a loop


JS has a very elegant way of iterating over an array (not a string) without a loop. These are well worth knowing about. But you cannot use *break* or *continue* while iterating.

*arr.every()* 	returns true if every element in array satisfies a particular condition.

*arr.some()* 	returns true if at least one element in array satisfies a particular condition.

*arr.map()* 	returns an array, transforms each element in array. Very similar to Python's map function. 

*arr.filter()* 	returns an array of only selected elements in array.

*arr.forEach()* returns nothing, but something can be done on each element in array.

*arr.reduce()*	returns a single value after going through each element in array.



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


Reduce an array to a single value using *reduce* and return a single value.

```javascript
/*
 sum all the values in an array
 each element, excluding first element 11, appears as a parameter x to the function
 x0 is an accumulator
		x0 initial value = 11 (first value in arr)
*/

var arr = [11,12,13,14];

var arr_reduce = arr.reduce(function(x0,x) {console.log(x0,x); return x0 + x;})
// logs 11 12 then 23 13 then 36 14
console.log(arr_reduce)
// logs 50




/*
 sum all the values in an array plus 100
 100 is passed as second argument to arr.reduce(function, 100)
 each element appears as a parameter x to the function
	including 11
 x0 is an accumulator
	x0 initial value = 100 (second argument)	 	 
*/

var arr = [11,12,13,14];

var arr_reduce = arr.reduce(function(x0,x) {console.log(x0,x); return x0 + x;}, 100)
// logs 100 11 then 111 12 then 123 13 then 136 14
console.log(arr_reduce)
// logs 150
```


####Iterating over property names associated with an object


Now consider a JS object that has property names. This has the form {propName1: value1, propName2: value2, ...}. Property names can be local to the object, or they may be up the prototype chain. We can loop over the property names attached to the object. But you **cannot** use the array traversing techniques. So *for(var index=0; index < someObj.length; index++)* and *while(index < someObj.length)* are **not** directly usable.

The *for (var propName in someObj)*, known as **for...in** is the right construct to loop through property names on an object.

The loop will iterate over all enumerable propert names on the object, plus anything on the constructor's prototype. **for...in*** does not guarantee the order of property names. Which is why you don't use it for arrays.



```javascript
// define an object
var obj = {a:1, b:2, c:[1,2,3], d:{aa:1}, e: function() {}};


function NewObjConstruct() {
	this.one = 100;
	this.two = 200;
	this.three = 300;
}
NewObjConstruct.prototype = obj;



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



Here is an example that shows how **for..in** iterates over all property names, while **Object.keys(someObj)** just returns local properties. 

```javascript
// construct a new object called objA
var obj = {a:1, b:2, c:[1,2,3], d:{aa:1}, e: function() {}};
// constructor which has local properties 'one', 'two', 'three'
// and on the prototype chain has properties 'a', 'b', 'c', 'd', 'e'
function ConstructObjA() {
    this.one = 100;
    this.two = 200;
    this.three = 300;
}
ConstructObjA.prototype = obj;
var objA = new ConstructObjA();
// objA is now constructed

// loop over all property names associated with objA
for (var propName in objA) {
    console.log(propName);
    //'one' then 'two' then 'three' then 'a' then 'b' then 'c' then 'd' then 'e'
    // note!!! - the order is not guaranteed.
    // notice property names on the prototype chain are included
}

// loop over just the local properties on objA
var localPropertyNames = Object.keys(objA);
var index = 0
while (index<localPropertyNames.length) {
    console.log(localPropertyNames[index]);
    //'one' then 'two' then 'three'
    // local properties only
    index++
}
```

Finally, if you want to extract property names on an object only on the prototype chain. We want *all properties* minus *local properties*.

```javascript
// construct a new object called objA
var obj = {a:1, b:2, c:[1,2,3], d:{aa:1}, e: function() {}};
// constructor which has local properties 'one', 'two', 'three'
// and on the prototype chain has properties 'a', 'b', 'c', 'd', 'e'
function ConstructObjA() {
    this.one = 100;
    this.two = 200;
    this.three = 300;
}
ConstructObjA.prototype = obj;
var objA = new ConstructObjA();
// objA is now constructed

var allProperties = [];
for (var propName in objA) {
    allProperties.push(propName);
}
var localProperties = Object.keys(objA);
var protoProperties = allProperties.filter(
            function(x) {
                // if x is not in localProperties
                if (localProperties.indexOf(x) === -1) {
                    // property is on prototype chain
                    return x;
                }
            }
)
console.log(protoProperties);
// 'a' then 'b' then 'c' then 'd' then 'e'
```



