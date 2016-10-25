##Javascript Memory Allocation##

Javascript code is first compiled and then executed. Execution takes place immediately after compilation. Memory is freed up using garbage collection. When an object or a function can no longer be reached, the heap is destroyed when the garbage collector next runs.

##Compilation Phase##

Compilation takes place before the Execution phase.

In the compilation phase variable and function reference names are encountered as the JavaScript engine parses the code. A Scope Manager keeps a scope lookup list of these references for later referral. Scope Manager maintains two pieces of information for a reference, the *scope* plus the *reference* name. We can think of the complete reference as *scope.name*.

Either a LHS (Left Hand Side) declaration, or a RHS (Right Hand Side) source  is referenced. If a RHS source is not known by Scope Manager we will get a *ReferenceError*.

```javascript
// parsing of variable and function names in compilation phase
var a = 1;                      // LHS 'a' added to scope lookup list as variable reference
b = 1;                          // assignment not a declaration, if 'b' reference does not exist it will be created in global scope
function fn1() {                // LHS 'fn1' declaration added to scope lookup list as function reference
    var a = 10;                 // the function body is not compiled until it is actually called
    console.log(a);             // RHS source 'a'
}   
fn1()                           // RHS source 'fn1'
```

Scope Manager will hold *global.a* and *global.fn1*. Were 'fn1' to be called and first compiled, then we would add reference *fn1.a* to Scope Manager.

Declarations are created in the compile phase. When a declaration is first created it has a value of undefined.


##Execution Phase##

Declarations occur before assignment.

Assignments happen where they naturally occur in the code.  

Function declarations are hoisted.

Example 1:

```javascript
fn1();                          // works fine, 'fn1'
                                // how can fn1 be called before declaration ?
function fn1() {
    console.log('fn1');
}
```

How to think about the code

```javascript
function fn1() {                // Function declarations are hoisted.
    console.log('fn1');
}
fn1();
```
end Example 1


Variable declarations are hoisted.

Example 2
```javascript
varFn1();                       // TypeError, varFn1 is declared but not yet assigned

var varFn1 = function fn1() {  // varFn1 assignment
    console.log('fn1');
}
```

How to think about the code
```javascript
var varFn1;                     // declaration, value = undefined, no assignment has taken place

varFn1();                       // undefined()

var varFn1 = function fn1() {   // Assignments happen where they naturally occur in the code.
    console.log('fn1');
}
```
end Example 2


Functions declarations are hoisted above variable declarations if there is a tie with same name.

Example 3
```javascript
foo();
var foo;
function foo() {
    console.log(1);
}
foo = function() {
    console.log(2);
}
```
How to think about the code
```javascript
function foo() {                // Functions declarations are hoisted above variable declarations if there is a tie with same name.
    console.log(1);
}

var foo;                        // Ignored as global.foo already declared

foo();                          // 1

foo = function() {              // Reassign foo
    console.log(2);
}
```
end Example 3

Function expressions behave like a normal variable declaration.

##How are these Scopes created##

Scopes are implicitly created by how the code is laid out, specifically how functions are nested. Each time a function is declared a new scope is created. JavaScript uses lexical scoping.

```javascript

function fn1() {                        // scope 1
    var a = 1;                          // fn1.a
    function fn2() {                    // scope 2
        var a = 2;                      // fn2.a
        function fn3() {                // scope 3
            var a = 3;                  // fn3.a
        }
    }    
}

It should be clear that scope3 is inside scope2 which is inside scope1. Scope lookup stops once Scope Manager finds the first match for the reference. And Scope Manager always searches from innermost to outermost scope.

If Scope Manager is doing a LHS assignment, and it has traversed all the way up to the root or global scope, the JavaScript engine kindly adds the new reference to the global scope. This may not be the behavior you want or expect.

On the other hand if Scope Manager is doing a RHS lookup, and has run out of places to look, a 'ReferenceError' is thrown.

It is possible to specifically reference the outermost scope from an inside scope by using *global.reference*. The actual name 'global' depends on the environment. In the browser one can use *window.reference*.







##Stack and Heap Allocation##

###Example 1###

```javascript
var a = 3;
b = 2;
function f(c) {
    b = 5;
    var d = 3;
    e = 2;
}
f(6);
```

Main stack compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
|main        | a         |       |                                                                                  |
|            |           |       | notice because 'b' has no *var* no reference is created in the compilation phase |
|main        | f         |       | function f is a blob of text                                                     |
|            |           |       | function f is not compiled until it is executed in the execution phase           |
|            |           |       | a hidden *scope pointer* points from 'f' to 'main' (1)                           |


Main stack execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| main       | a         | 3     |                                                                                 |
| main       | b         | 2     | 'b' is created on global scope, because it does not already exist               |
| main       | f(6)      |       | function 'f' called and new heap for 'f' springs to life                        |

Function 'f' heap, compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         |       | Function parameter is a local variable                                          |
| f          | d         |       |                                                                                 |
|            |           |       | *scope pointer* copied (1)                                                      |

Function 'f' heap, execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         | 6     | Value of passed parameter                                                       |
| main       | b         | 5     | 'b' not local, so follow scope using *scope pointer* (1)                        |
| f          | d         | 3     |                                                                                 |
| main       | e         | 2     | 'e' not local, so follow scope using *scope pointer* (1)                        |
|            |           |       | 'e' does not exist on global so create 'e' on global                            |

When function f completes the heap is destroyed. Not to be confused with 'main.f' reference to the blob of text that contains the actual code for the function.

###Example 2###

```javascript
var a = 3;
b = 2;
function f(c) {
    b = 5;
    var d = 3;
    function g() {
        return 2*c;    
    }
    return g();
    e = 2;
}
f(6);
```

Main stack compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
|main        | a         |       |                                                                                  |
|            |           |       | notice because 'b' has no *var* no reference is created in the compilation phase |
|main        | f         |       | function f references a blob of text                                                     |
|            |           |       | function f is not compiled until it is executed in the execution phase           |
|            |           |       | a hidden *scope pointer* points from 'f' to 'main' (1)                           |


Main stack execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| main       | a         | 3     |                                                                                 |
| main       | b         | 2     | 'b' is created on global scope, because it does not already exist               |
| main       | f(6)      |       | function 'f' called and new heap for 'f' springs to life                        |


Function 'f' heap, compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         |       | Function parameter is a local variable                                          |
| f          | d         |       |                                                                                 |
|            |           |       | *scope pointer* copied (1)                                                      |
| f          | g         |       | function g references a blob of text                                            |
|            |           |       | function g is not compiled until it is executed in the execution phase          |
|            |           |       | a hidden *scope pointer* points from 'g' to 'f' (2)                             |

Function 'f' heap, execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         | 6     | Value of passed parameter                                                       |
| main       | b         | 5     | 'b' not local, so follow scope using *scope pointer* (1)                        |
| f          | d         | 3     |                                                                                 |
| f          | g()       |       | function 'g' called and new heap for 'g' springs to life
| main       | e         | 2     | 'e' not local, so follow scope using *scope pointer* (1)                        |
|            |           |       | 'e' does not exist on global so create 'e' on global                            |


Function 'g' heap, compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
|            |           |       | Nothing to compile                                                              |            
|            |           |       | Scope pointer to 'f'                                                            |


Function 'g' heap, execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         | 6     |                                                                                 |            
|            |           |       | return 2*c = 12                                                                 |

When function 'g' completes the 'g' heap is destroyed.
When function 'f' completed the 'f' heap is destroyed.


###Example 3###

```javascript
var a = 3;
b = 2;
function f(c) {
    b = 5;
    var d = 3;
    function g() {
        return 2*c;    
    }
    return g;
    e = 2;
}
var z = f(3);
z();
```

Main stack compilation phase

| Call stack | Reference | Value | Comment                                                                          |
| ---------- | --------- | ----- | -------------------------------------------------------------------------------- |
|main        | a         |       |                                                                                  |
|            |           |       | notice because 'b' has no *var* no reference is created in the compilation phase |
|main        | f         |       | function f references a blob of text                                             |
|            |           |       | function f is not compiled until it is executed in the execution phase           |
|            |           |       | a hidden *scope pointer* points from 'f' to 'main' (1)                           |
|main        | z         |       |                                                                                  |

Main stack execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| main       | a         | 3     |                                                                                 |
| main       | b         | 2     | 'b' is created on global scope, because it does not already exist               |
| main       | z         | f(3)  | function 'f' execution context                                                  |
|            |           |       | function 'f' called and new heap 'f' springs to life                            |
|            |           |       | a hidden *scope pointer* points from 'f' to 'main'                              |
| main       | z()       |       | execute function 'g'                                                            |


Function 'f' heap, compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         |       | Function parameter is a local variable                                          |
| f          | d         |       |                                                                                 |
| f          | g         |       | function g references a blob of text                                            |
|            |           |       | function g is not compiled until it is executed in the execution phase          |
|            |           |       | a hidden *scope pointer* points from 'g' to 'f' (2)                             |

Function 'f' heap, execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         | 6     | Value of passed parameter                                                       |
| main       | b         | 5     | 'b' not local, so follow scope using *scope pointer* (1)                        |
| f          | d         | 3     |                                                                                 |
| f          | return g  |       | returns a reference to function 'g' as a blob of text                           |
| main       | e         | 2     | 'e' not local, so follow scope using *scope pointer* (1)                        |
|            |           |       | 'e' does not exist on global so create 'e' on global                            |


Function 'g' heap, compilation phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
|            |           |       | Nothing to compile                                                              |            
|            |           |       | Scope pointer to 'f'                                                            |


Function 'g' heap, execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| f          | c         | 3     |                                                                                 |            
|            |           |       | return 2*c = 6                                                                  |

When function 'g' completes the 'g' heap is destroyed.

But main.z maintains a reference to function 'g' text blob, and 'g' text blob has a reference to function 'y' heap c variable. So we cannot destroy the the function 'y' heap, otherwise we lose that reference.
