##Javascript Memory Allocation##

Javascript code is first compiled and then executed. Execution takes place immediately after compilation. Memory is freed up using garbge collection. When an object or a function can no longer be reached, the heap is destroyed when the garbage collector next runs.

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

Compilation Phase
Main Stack
a                       reference to 'a'
                        notice because 'b' has no *var* it takes no part in the compilation phase
f                       reference to 'f', and function f is a blob of text
                        notice 'f' is not compiled until it is executed in the execution phase

Execution phase
Main Stack
a                       3
b                       2
f                       reference to 'f' as a blob of text
f(6)                    function f called and new heap springs to life

Function 'f' heap
Compilation phase
c                       reference to 'c'
d                       reference to 'd'
Implicit pointer up to Main


Execution phase
c                       6 parameter value that is passed
Main stack 'b'          'b' not local, so look up to Main using implicit pointer, set to 5
d                       3
                        'e' not local, so look up to Main using implicit pointer, 'e' does not exist on global so create 'e' on global
