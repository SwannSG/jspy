##Javascript Memory Allocation##

Javascript code is first compiled and then executed. Execution takes place immediately after compilation. Memory is freed up using garbage collection. When an object or a function can no longer be reached, the heap is destroyed when the garbage collector next runs.

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





Main Stack
Compilation Phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
|main        | a         |       |                                                                                  |
|            |           |       | notice because 'b' has no *var* no reference is created in the compilation phase |
|main        | f         |       | function f is a blob of text                                                     |
|            |           |       | function f is not compiled until it is executed in the execution phase           |
|            |           |       | a hidden *scope pointer* points from 'f' to 'main' (1)                           |


Main Stack
Execution phase

| Call stack | Reference | Value | Comment                                                                         |
| ---------- | --------- | ----- | ------------------------------------------------------------------------------- |
| main       | a         | 3     |                                                                                 |
| main       | b         | 2     | 'b' is created on global scope, because it does not already exist               |
| main       | f(6)      |       | function 'f' called and new heap for 'f' springs to life                        |

Function 'f' heap
Compilation phase
c                       reference to 'c'
d                       reference to 'd'
                        *scope pointer* copied (1)

Function 'f' heap
Execution phase
c                       6 parameter value that is passed
main.'b'                5 'b' not local, so look up to 'main' using *scope pointer*
d                       3
                        'e' not local, so look up to Main using implicit pointer, 'e' does not exist on global so create 'e' on global
