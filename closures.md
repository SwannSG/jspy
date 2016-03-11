#Closures

Javascript allows a function to reference a parent variable outside the function, without passing the variable as an argument to the function.

Function abc() has a closure around init. 

In general, it is a function that "holds" a reference or references, to something in another scope.

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

JS uses lexical scoping. References to a variable are associated with a scope. For example in *3*, **a** is associated the 'window' scope.

But in the *function xyz*, **a** is associated with the 'xyz' scope. These are two different references.

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

|                |                                                                                             |
|----------------|---------------------------------------------------------------------------------------------|
|window-------->a|	can be referenced in *window scope*, but also could be referenced in *function xyz() scope*|
|function xyz-->a|	can only be referenced in *function xyz() scope*|

In this instance *function xyz-->a* reference "hides" the reference to *window-->a*.

When **a** is encountered, fist look in the local scope, then the parent scope, then the grandparent scope, and finally all the way up to the "root" scope. If **a** is never found a *ReferenceError: a is not defined* will be thrown. This is called the **Scope Chain**.   


###Practical Closures

In asynchronous and event-driven programming, closures are very helpful and are used a lot.

We often want to execute a function at some future time, with some initial condions that we know about now.

Keep in mind we may not know or have easy access to these inital conditions when the function is actually called. 

We can establish multiple execution options using the same function but with different initial conditions.

|                                   |                                                                              |
|-----------------------------------|------------------------------------------------------------------------------|
|same function initial_conditions_1 | function will be called at some future time and contains initial_conditions_1|
|same function initial_conditions_2 | function will be called at some future time and contains initial_conditions_2|
|same function initial_conditions_3 | function will be called at some future time and contains initial_conditions_3|

```javascript
// 4

function initial_conditions(x,y,z) {
	/*	
		initial_conditions are defined here
		in this case x,y,z are the initial_conditions
			in the real world you may not have easy access to these initial condions
			when function_to_run_in_future() runs. That is why we use this construct. 
	*/

	function function_to_run_in_future() {
		// this is the function you want to execute at some future time
		return x + y + z;
	}

	// make the function 'stuff_to_do' visible
	return function_to_run_in_future;
}

// f_init_1, function 'function_to_run_in_future' with initial conditions 'a','b','c' waiting to be run at some future time 
var f_init_1 = initial_conditions('a','b','c');

// f_init_2, function 'function_to_run_in_future' with initial conditions 'd','e','f' waiting to be run at some future time 
var f_init_2 = initial_conditions('d','e','f');

// invoke 'f_init_1' which causes 'function_to_run_in_future' to run with initial_conditions_1 
f_init_1();
// 'abc'

// invoke 'f_init_2' which causes 'function_to_run_in_future' to run with initial_conditions_2 
f_init_2();
// 'def'

```

Review the code in *4*.

The actual function we want to run at some future time is 'function_to_run_in_future'. The function 'initial_conditions' is only there to setup the initial values of x,y, and z. Remember we may not have easy access to these initial conditions at the time 'function_to_run_in_future' executes.

Also function 'initial_conditions' returns the 'function_to_run_in_future' function.    








   




