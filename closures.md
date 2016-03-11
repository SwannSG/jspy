#Closures

Javascript allows a function to reference a parent variable outside the function, without passing the variable as an argument to the function.

Function abc() has a closure around init. 

In general, it is a function that "holds" a reference, to something in a parent scope.

```javascript
// 1

var init = 100;
function abc() {
	/*
	 refer to variable 'init'
	 even though 'init' is not passed as a parameter
	*/
	var result = init + 20;
	return result
}

abc();
// 120

init = 20;
abc();
// 40
```


```javascript
// 2

var init = 100;

function def() {	

	return abc();
	
	function abc() {
		/*
		 refer to variable 'init'
		 even though 'init' is not passed as a parameter
		 and 'init' is "2 scopes up" in the grandparent scope
		*/
		var result = init + 20;
		return result
	}
}

def();
// 120

init = 20;
abc();
// 40
```

###Variable Scope

JS uses lexical scoping. References to a variable are associated with a scope. For example in *3*, **a** is associated with the 'window' scope.

But in the **function xyz.a** is associated with the scope of **function xyz**. These are two separate and different references.

```javascript
// 3

var a = 100
// in a browser the parent is 'window'
// and this means 'window.a = 100'

function xyz() {
	var a = 50;
}
```

We have.

| Reference      | Description                                                                                             |
|----------------|---------------------------------------------------------------------------------------------|
|window.a or a   |	can be referenced in *window scope*, but also could be referenced in *function xyz() scope*|
|function xyz.a  |	can only be referenced in *function xyz() scope*|

In this instance **function xyz.a** reference masks the reference to **window.a**. It does not overwrite the value of **window.a**.

When **a** is encountered,

first look in the local scope,

then the parent scope,

then the grandparent scope,

and finally all the way up to the "root" scope.

If **a** is never found a *ReferenceError: a is not defined* will be thrown. This is called the **Scope Chain**.   


###Practical Closures

In asynchronous and event-driven programming, closures are very helpful and are used a lot.

We often want to execute a function at some future time, with some initial condions that we know about now.

Keep in mind we may not know or have easy access to these inital conditions when the function is actually called. 

We can establish multiple execution options using the same function but with different initial conditions.

Apparently this is also called a Function Factory.


|  									     |                                                                              |
|----------------------------------------|------------------------------------------------------------------------------|
|same function with initial_conditions_1 | function will be called at some future time and contains initial_conditions_1|
|same function with initial_conditions_2 | function will be called at some future time and contains initial_conditions_2|
|same function with initial_conditions_3 | function will be called at some future time and contains initial_conditions_3|

```javascript
// 4

/*
	We want to execute fn_to_exec at a future time.
	We want fn_to_exec to have different initial values.
	We set these initial values up ahead of time.
		f_init_1	fn_to_exec with init_1 values
		f_init_2	fn_to_exec with init_2 values	
*/


function init(x,y,z) {
	/*	
		Initial values for x,z,z are passed as arguments to init()
		We may not have easy access to these initial condions when fn_to_exec() runs.
	    That is why we use this Factory Function construct. 
	*/

	function fn_to_exec() {
		// this is the function we want to execute at some future time
		return x + y + z;
	}

	// make the function 'stuff_to_do' visible
	return fn_to_exec;
}

// f_init_1 reference to function 'fn_to_exec' with
// initial conditions 'a','b','c' waiting to be run at some future time 
var f_init_1 = init('a','b','c');

// f_init_2, function 'fn_to_exec' with
// initial conditions 'd','e','f' waiting to be run at some future time 
var f_init_2 = init('d','e','f');

// invoke 'f_init_1' which causes 'fn_to_exec' to run with init_1 
f_init_1();
// 'abc'

// invoke 'f_init_2' which causes 'fn_to_exec' to run with init_2 
f_init_2();
// 'def'

```

Review the code in *4*.

The actual function we want to run at some future time is **fn_to_exec**.

The function **init** is only there to setup the initial values of x,y, and z. Remember we may not have easy access to these initial conditions at the time **fn_to_exec** is called.

Also function **init** returns the **fn_to_exec** function.    








   




