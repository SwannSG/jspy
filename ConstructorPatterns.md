#Useful Patterns For Constructors

The Factory Pattern and Constructor Pattern can achieve the same results.

But a Constructor Pattern always requires the use of the **new** keyword when instantiating.

```javascript
// Constructor Pattern
var Widget = function(x) {
	this.name = x;
	return this;
}
var newObj = new Widget('Henry);
```

Suppose we forget to use the **new** keyword in the Constructor Pattern.

The **this** in Widget is actually now the root object (*window* in the browser). We set window.name = 'Henry' and we assign the *window* object to newObj. 

```javascript
// Constructor Pattern
var Widget = function(x) {
	// if the "new" keyword is forgotten
	// "this" = scope from where the function is called 	
	this.name = x;
	return this;
}
var newObj = Widget('Henry');
```

We need to be ultra careful about forgetting to use **new** with a Constructor Pattern.


### Factory Pattern

Quick, simple and intuitive.

Downside, method code is actually held locally on the instantiated object.

For ultra lightweight objects it is better to hold common methods on the parent prototype. 

Using the factory pattern is simple, and does not require the **new** keyword.


```javascript
// factory pattern ************************************************
var factoryName = function(name, surname) {
	// create a new object literal
	var temp = {};
	
	// attach properties to object literal
	temp.name = name;	
	temp.surname = surname;
	// -----------------------------------

	// add method to object literal
	// problem is all new objects contain printPerson locally (which is redundant)
	temp.printName = function() {
		// "this" refers to temp
		console.log(this.name + ', ' + this.surname);
	};
	// -----------------------------------	

	// return object literal
	return temp;
};
```


```javascript
// factory pattern usage
var name1 = factoryName('john', 'jones');
var name2 = factoryName('kim', 'shippey');
name1.printName();
name2.printName();
```

###Constructor Pattern

Again, method code is actually held locally on the instantiated object.

Requires the **new** keyword to instantiate.

Otherwise very similar to the Factory Pattern.

To avoid damage done when we instantiate the object and forget to use the **new** keyword, we can place a small check at the top of the Constructor function. The test checks that we have don't have a global *this*.

```javascript
var ConstructorName = function(name, surname) {

	// safety check to make sure "new" keyword is used when ConstructorName is called	
	// there may be a better test, but this one works 
	if (typeof(this.RegExp) === 'function') {throw new Error('constructor Name called without "new" keyword');}

	// when called with the "new" keyword
	// this ~ {} and we attach properties and methods to "this"
	this.name = name;
	this.surname = surname;
	this.printName = function() {
		return this.name + ', ' + this.surname;
	};
};
```

Note the **new** keyword is absolutely required.

```javascript
// constructor pattern usage
// requires "new" keyword
var name1 = new peopleConstructor('john', 'jones');
var name2 = new peopleConstructor('kim', 'shippey');
person1.printPerson();
person2.printPerson();
```

###Constructor/Prototype Pattern

We want a pattern were properties are kept at the local level, but methods are "centralised" and maintained in a single central place. We don't want the method functions individually attached at the local object, because that makes the object "heavier". Having methods centralised means a single change is instantly available to all objects.  

Every function has a **prototype** property. An object literal does not have a prototype property, so we cannot attach a *prototype* to that.

We can just as readily attach properties at the prototype level if we know they will always be required.


```javascript
var Name = function (name, surname) {

	// safety check to make sure "new" keyword is used when constructor Name is called	
	if (typeof(this.RegExp) === 'function') {
		throw new Error('constructor Name called without "new" keyword');
		}

	/*	
	 methods to be placed on the prototype can be added here
	 notice __printName__ cannot be the same as printName in Name.prototype.printName
	 otherwise it will mask the printName on the prototype
	*/	
	var __printName__ = function() {return this.name + ', ' + this.surname;};


	// attach local properties to "this"
	this.name = name;
	this.surname = surname;

	/*	
 	 we don't add the method to "this"
	 we add the method to Name.prototype
	 and we only add it if the method does not exist on the prototype
	*/    
	if (typeof(Name.prototype.printName) !== 'function') {
				/*				
				 "this" is aware that it's parent is the Name constructor
				 and it will look for methods and propeties on the parent
				 if they cannot be found locally
				*/                
				Name.prototype.printName = __printName__;
            }
	return this;
};
```

Instantiate as follows. Remember we need the **new** keyword. Notice that the method *printName* is not held locally on *name1* or *name2*.

```javascript
var name1 = new Name('Joe', 'Bloggs');
var name2 = new Name('Jill', 'Bloggs');

console.log(name1.printName());
// 'Joe','Bloggs'
```
###Summary

There seem to be plenty of patterns around designed by clever people. 

For simplicity where method overhead is not a big issue just stick to the **Factory Pattern**.

Otherwise use the **Constructor/Prototype Pattern**. 
 






