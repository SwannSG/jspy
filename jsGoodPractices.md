##Javascript Good Practices##

###Don't pollute the Global Namespace###

Use a Module Pattern (with one global variable).

Other variables and methods are referenced inside the module via the single global variable.

```javascript
var myOneGlobalVariable = (function() {
    var modulePrivateVariableOne = 10;
    var modulePrivateMethodOne = function modulePrivateMethodOne() {
        //do something
        };

    return {
        modulePublicVaribleOne = 'hello';
        modulePublicMethodOne = function modulePublicMethodOne () {
            return modulePrivateMethodOne();
        }
    }
})();

// variables and methods referenced via the single global variable
myOneGlobalVariable.modulePublicVariableOne;        //helllo
myOneGlobalVariable.modulePublicMethodOne();
```

###Truthy versus Falsy###

Almost all javascript values are truthy. When testing with an if statement remember this.
Empty objects {} and arrays [] are truthy.

The only falsy values are false, undefined, null, NaN, empty string ("" or ''), and 0.

###Avoid function side-Effect###

When writing a function try not to change (mutate) any variable that is not explicitly declared inside your function as a local variable. Keep in mind that *ALL* objects are passed by reference to a function.

Only primitives are passed by value where a copy of the variable is passed, and not a reference to the variable.

```javascript
obj = {};

// an example of a function f1 that mutates obj inside the function
// this function f1 has side-effects
function f1(parm) {
    // parm is a pointer to obj
    parm.task = 'new task'  // this actually adds a new property to obj
}

f1(obj)                        // this mutates obj

```

To avoid side-effects we need to first make a copy of the object, and then return the modified copy.

Making a copy of a javascript object is a subject on its' own. Suffice to say there is the concept of a "shallow copy" (only objects own properties copied), and "deep copy" where all properties are copied.

Generally a shallow copy will suffice.


```javascript
obj = {};

// this function f1 has no side-effects
function f1(parm) {
    // parm is a pointer to obj
    // first make a copy of parm
    // $.extend()   jQuery
    // _.clone()    underscore
    var privateObj = Object.assign({},obj);     // shallow copy of object
    privateObj.task = 'new task'  // this actually adds a new property to obj
    return privateObj;
}

obj = f1(obj)                        
```
