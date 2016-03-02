/**
 * Created by swannsg on 2016/02/25.
 *
 * tests for List constructor
 */
//load(['py_lite.min.js']);
load(['py_lite.js']);
load(['lodash.js']);

function assert(x,y,cmp, test) {
    switch (cmp) {
        case 'eq':
            if (_.isEqual(x,y)) {
                console.log('test: ' + test + ' passed');
            }
            else {
                console.log('test: ' + test + ' failed');
            }
    }

}


// test primitive numbers
l = new py.List(1096, 23,4,1,1096,56,10);
var r = l.count(1096);
assert(r,2,'eq', 1);
l.append(22);
assert(l.arr,[1096, 23,4,1,1096,56,10,22],'eq', 2);
l.insert(3,98)
assert(l.arr,[1096, 23,4, 98, 1,1096,56,10,22],'eq', 3);
r = l.index(1096);
assert(r,0,'eq',4);
r = l.index(1096,2);
assert(r,5,'eq',5);
r = l.index(1096,5,7);
assert(r,5,'eq',6);
r = l.pop()
assert(l.arr,[1096, 23,4, 98, 1,1096,56,10],'eq','7a');
assert(r,22,'eq','7b');
r = l.pop(3);
assert(l.arr,[1096, 23, 4, 1,1096,56,10],'eq','8a');
assert(r,98,'eq','8b');
l.remove(1096);
assert(l.arr,[23, 4, 1,1096,56,10],'eq', 9);
l.reverse();
assert(l.arr,[10, 56, 1096, 1, 4, 23],'eq', 10);
l.sort()
assert(l.arr,[1, 4, 10, 23, 56, 1096],'eq', 11);
l.extend([210, 205, 300]);
assert(l.arr,[1, 4, 10, 23, 56, 1096, 210, 205, 300],'eq', 12);
l.extend(new py.List(5,6,7));
assert(l.arr,[1, 4, 10, 23, 56, 1096, 210, 205, 300,5,6,7],'eq', 13);


// test primitive strings
l = new py.List('def', 'abc', 'zkl', 'bba', 'abc');
var r = l.count('abc');
assert(r,2,'eq', 21);
l.append('zaf');
assert(l.arr,['def', 'abc', 'zkl', 'bba', 'abc', 'zaf'],'eq', 22);
l.insert(3,'cadaz');
assert(l.arr,['def', 'abc', 'zkl', 'cadaz', 'bba', 'abc', 'zaf'],'eq', 23);
r = l.index('cadaz');
assert(r,3,'eq',24);
r = l.index('abc',2);
assert(r,5,'eq',25);
r = l.index('abc',5,7);
assert(r,5,'eq',26);
r = l.pop()
assert(l.arr,['def', 'abc', 'zkl', 'cadaz', 'bba', 'abc'],'eq','27a');
assert(r,'zaf','eq','27b');
r = l.pop(3);
assert(l.arr,['def', 'abc', 'zkl', 'bba', 'abc'],'eq','28a');
assert(r,'cadaz','eq','28b');
l.remove('abc');
assert(l.arr,['def', 'zkl', 'bba', 'abc'],'eq', 29);
l.reverse();
assert(l.arr,['abc', 'bba', 'zkl', 'def'],'eq', 30);
l.sort()
assert(l.arr,['abc', 'bba', 'def', 'zkl'],'eq', 31);
l.extend([210, 205, 300]);
assert(l.arr,['abc', 'bba', 'def', 'zkl',210, 205, 300],'eq', 32);
l.extend(new py.List('a', 'b', 'c'));
assert(l.arr,['abc', 'bba', 'def', 'zkl',210, 205, 300,'a', 'b', 'c'],'eq', 33);

// test object with single property
console.log('');
l = new py.List({z:1}, {abc:5}, {zzz:45}, {aaa:13}, {z:1})
var r = l.count({z:1});
assert(r,2,'eq', 51);
l.append({adr: 'abcdef'});
assert(l.arr,[{z:1}, {abc:5}, {zzz:45}, {aaa:13}, {z:1}, {adr: 'abcdef'}],'eq', 52);
l.insert(3,{w:24});
assert(l.arr,[{z:1}, {abc:5}, {zzz:45}, {w:24}, {aaa:13}, {z:1}, {adr: 'abcdef'}],'eq', 53);
r = l.index({w:24});
assert(r,3,'eq',54);
r = l.index({w:24},2);
assert(r,3,'eq',55);
r = l.index({w:24},3,7);
assert(r,3,'eq',56);
r = l.pop();
assert(l.arr,[{z:1}, {abc:5}, {zzz:45}, {w:24}, {aaa:13}, {z:1}],'eq', 57);
r = l.pop(4);
assert(l.arr,[{z:1}, {abc:5}, {zzz:45}, {w:24}, {z:1}],'eq', 58);
l.remove({zzz:45});
assert(l.arr,[{z:1}, {abc:5}, {w:24}, {z:1}],'eq', 59);
l.extend(new py.List({wer: 'a'}, {rus:'b'}, {vuw:'c'}));
assert(l.arr,[{z:1}, {abc:5}, {w:24}, {z:1},{wer: 'a'}, {rus:'b'}, {vuw:'c'}],'eq', 60);
l.sort()
assert(l.arr,[{'abc': 5}, {'rus': 'b'}, {'vuw': 'c'}, {'w': 24}, {'wer': 'a'}, {'z': 1}, {'z': 1}],'eq', 61);

// test object with multiple properties
l = new py.List({name: 'Joe', surname: 'Bloggs', age: 25},
             {name: 'Mary', surname: 'Knoetzen', age: 35},
             {name: 'John', surname: 'James', age: 15},
             {name: 'Jim', surname: 'van Rooyen', age: 125}
);
// complex object requires a complex sort
// DO NOT rely on 'name' being the first property on the object
// the default sort for a complex object is to sort on the first property name (not the value)
l.sort()
assert(l.arr, [{name: 'Joe', surname: 'Bloggs', age: 25},
        {name: 'Mary', surname: 'Knoetzen', age: 35},
        {name: 'John', surname: 'James', age: 15},
        {name: 'Jim', surname: 'van Rooyen', age: 125}],
    'eq', 70)
// sort on the name value
l.sort({cmp:'', key: function(x) {return x.name;}, reverse:false});
assert(l.arr, [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Joe", surname:"Bloggs", age:25},
                    {name:"John", surname:"James", age:15}, {name:"Mary", surname:"Knoetzen", age:35}],
                    'eq', 71);
// sort on the surname value and reverse
l.sort({cmp:'', key: function(x) {return x.surname;}, reverse:true});
assert(l.arr, [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
                     {name:"John", surname:"James", age:15}, {name:"Joe", surname:"Bloggs", age:25}],
                     'eq', 72);

// sort on surname + name
l.append({name:"Alfred", surname:"James", age:65});
l.sort({cmp:'', key: function(x) {return x.surname + x.name;}, reverse:true});
assert(l.arr, [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
                {name:"John", surname:"James", age:15}, {name:"Alfred", surname:"James", age:65},
                {name:"Joe", surname:"Bloggs", age:25}],
    'eq', 73);

// test random edge cases
l = new py.List(1,2,3,4,5,6);
r = l.count(8)
assert(r,0,'eq',100);
r = l.index(8);
assert(r,false,'eq',101);

// test py.sorted()
r = py.sorted('zdawqrvb');
assert(r.arr, ['a', 'b', 'd', 'q', 'r', 'v', 'w', 'z'], 'eq', 200);
r = py.sorted([4,2,8,9,23]);
assert(r.arr, [2, 4, 8, 9, 23], 'eq', 201);
r = py.sorted([{z:1}, {z:1}, {wer:"a"}, {w:24}, {vuw:"c"}, {rus:"b"}, {abc:5}]);
assert(r.arr, [{abc:5}, {rus:"b"}, {vuw:"c"}, {w:24}, {wer:"a"}, {z:1}, {z:1}], 'eq', 202);
r = py.sorted([{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
               {name:"John", surname:"James", age:15}, {name:"Joe", surname:"Bloggs", age:25},
               {name:"Alfred", surname:"James", age:65}]);
assert(r.arr, [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
    {name:"John", surname:"James", age:15}, {name:"Joe", surname:"Bloggs", age:25},
    {name:"Alfred", surname:"James", age:65}], 'eq', 203);

r = py.sorted([{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
    {name:"John", surname:"James", age:15}, {name:"Joe", surname:"Bloggs", age:25},
    {name:"Alfred", surname:"James", age:65}], {cmp:'', key: function(x) {return x.surname;}, reverse:true});
assert(r.arr, [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
    {name:"Alfred", surname:"James", age:65}, {name:"John", surname:"James", age:15},
    {name:"Joe", surname:"Bloggs", age:25}], 'eq', 204);

r = py.sorted([{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
    {name:"John", surname:"James", age:15}, {name:"Joe", surname:"Bloggs", age:25},
    {name:"Alfred", surname:"James", age:65}], {cmp:'', key: function(x) {return x.surname + x.name;}, reverse:true});
assert(r.arr, [{name:"Jim", surname:"van Rooyen", age:125}, {name:"Mary", surname:"Knoetzen", age:35},
        {name:"John", surname:"James", age:15}, {name:"Alfred", surname:"James", age:65},
        {name:"Joe", surname:"Bloggs", age:25}],
    'eq', 205);

r = py.sorted({name:"Jim", surname:"van Rooyen", age:125});
assert(r.arr, ['age', 'name', 'surname'], 'eq', 206)

r = py.sorted(new py.List([6,5,4,3,2,1]));
assert(r.arr, [1,2,3,4,5,6], 'eq', 207);

// test py.type()
r = py.type(null);
assert(r, 'null', 'eq', 300);
r = py.type([1,2,3,4]);
assert(r, 'array', 'eq', 301);
r = py.type(123.45);
assert(r, 'number', 'eq', 302);
r = py.type(true);
assert(r, 'boolean', 'eq', 303);
r = py.type('some string');
assert(r, 'string', 'eq', 304);
var some_var;
r = py.type(some_var);
assert(r, 'undefined', 'eq', 305);
r = py.type({name:'value'});
assert(r, 'object', 'eq', 306);
r = py.type(new Date());
assert(r, 'date', 'eq', 307);
r = py.type(new py.List());
assert(r, 'list', 'eq', 308);









