#Understanding "this"

##What is "this"

**this** always refers to a single object.

The single object may be of the form *{propertyName1: value1, ..., propertyNameN: valueN}*.

*valueN* may be a primitive, function or an object.

In a browser the global object is the *window* and in the global context **this=window**.

In node the global object is *global* and in the global context **this=global**.


##How do you know which object "this" is referring to ?



![Image of "this" logic]
(https://github.com/SwannSG/jspy/blob/master/this.jpg)



##Is the function being invoked with “new” ?

When a function is invoked with the **new** keyword, an empty **this** object is created in the called function.

See Example 1.

```javascript
// Example 1

var Widget = function(name, colour) {
	/*	
		'this' => new object created by the "new" keyword
		widget = new Widget('dog', 'brown');
	*/	
	this.name = name;
	this.colour = colour;
	return this;
}

widget = new Widget('dog', 'brown');

```

##Is the function being invoked without "new" and without a "dot" ?

Then **this** refers to the global object i.e **this=window**.

In Example 2 we invoke Widget directly, without the **new** keyword, and without a dot(.).


```javascript
// Example 1

var Widget = function(name, colour) {
	/*	
		'this' => global object
		widget =  Widget('dog', 'brown');
	*/	
	this.name = name;
	this.colour = colour;
	return this;
}

// Widget invoked without the "new" keyword 
widget = Widget('dog', 'brown');

```

##Is the function being invoked with a "dot"(.) operator ?

In Example 3 we show a function call using the dot(.) operator **widget.printWidget()**.

In this case **this => widget**. The reference given by the piece in front of the dot(.). 


```javascript
// Example 3

var Widget = function(name, colour) {

	this.name = name;
	this.colour = colour;

	/*
		'this' => object before the dot(.)
			widget.printWidget() then 'this' references 'widget'
	*/
	this.printWidget = function() {return this.name + ' ' + this.colour;}

	return this;
}

widget = new Widget('dog', 'brown');

/*
 In the function printWidget() 'this' refers to 'widget'	
*/
widget.printWidget();
```

##Ways to control what "this" points to when we call a function

### function.bind(context)

With a function that we setup now, but which will only run in the future (like a callback), we may not have the correct **this** context when the callback runs sometime in the future.

We can pass context to the callback function using **bind**. See Example 4. 

The form is **function_to_be_called.bind(desired_context)**.

Notice **function_to_be_called.bind(desired_context)** has to be invoked with () at the end as **function_to_be_called.bind(desired_context)()**.


```javascript
// Example 4

var callback = function() {
	return this.name + this.surname;
};

var context_1 = {name:'Joe', surname: 'Bloggs'};
var context_2 = {name:'Jill', surname: 'Jones'};

// function_to_be_called.bind(desired_context)()
callback.bind(context_1)();
// 'JoeBloggs'

callback.bind(context_1)();
// 'JillJones'
```

To pass parameters to the function see Example 5. 

**function_to_be_called.bind(desired_context, arg_1, arg_2, ...., arg_n)**

```javascript
// Example 5

var callback = function(x) {
	return this.name + this.surname + x;
};

var context_1 = {name:'Joe', surname: 'Bloggs'};
var context_2 = {name:'Jill', surname: 'Jones'};

// function_to_be_called.bind(desired_context)(arg_1)
callback.bind(context_1, 'hello')();
// 'JoeBloggs'

callback.bind(context_2, 'goodbye')();
// 'JillJones'
```

In the above examples we invoke **function_to_be_called.bind(desired_context)** immediately.

In practice we don't normally do that. We setup the function with the desired context and arguments, and then when an event occurs the "setup function" is invoked.

```javascript
// Example 5

var callback = function(x) {
	result = this.name + this.surname + x;
};

var context_1 = {name:'Joe', surname: 'Bloggs'};

// callback.bind(context_1, 'helllo') sets up the function
// when timeout expires the "setup function", callback is called
var result;
setTimeout( callback.bind(context_1, 'helllo')  , 3000);
result
// JoeBloggshello
```
 

###function.call() and function.apply()

**function_to_be_called.call(desired_context, arg1, arg2, ....)** where arg1, arg2, ... are arguments to *function_to_be_called*.

**function_to_be_called.apply(desired_context, arg_in_single_array)** where arguments are passed to *function_to_be_called* in a single array.

See example 6.

```javascript
// Example 6

var callback = function(x) {
	return this.name + this.surname + x;
}

var context_1 = {name:'Joe', surname: 'Bloggs'};
var context_2 = {name:'Jill', surname: 'Jones'};

// function_to_be_called.call(desired_context, arg_1)
callback.call(context_1,'hello');
// 'JoeBloggs'

// function_to_be_called.call(desired_context, [arg_1])
callback.apply(context_1,['goodbye']);
// 'JillJones'
```
















