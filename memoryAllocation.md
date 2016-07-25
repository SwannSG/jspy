##Javascript Memory Allocation##

Javascript code is first compiled and then executed. Execution takes place immediately after compilation. Memory is freed up using garbage collection. When an object or a function can no longer be reached, the heap is destroyed when the garbage collector next runs.

When a function is first referenced ....


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
