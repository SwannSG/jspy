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
| f          | c         | 6     |                                                                                 |
| main       | b         | 5     | 'b' not local, so follow scope using *scope pointer* (1)                        |
| f          | d         | 3     |                                                                                 |
| main       | e         | 2     | 'e' not local, so follow scope using *scope pointer* (1)                        |
|            |           |       | 'e' does not exist on global so create 'e' on global                            |

When function f completes the heap is destroyed. Not to be confused with 'main.f' reference to the blob of text.
