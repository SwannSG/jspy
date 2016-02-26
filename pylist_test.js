/**
 * Created by swannsg on 2016/02/25.
 */
load(['pylist.js']);
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
l = new List(1096, 23,4,1,1096,56,10);
var r = l.count(1096);
assert(r,2,'eq', 1);
l.append(22);
assert(l.base_list,[1096, 23,4,1,1096,56,10,22],'eq', 2);
l.insert(3,98)
assert(l.base_list,[1096, 23,4, 98, 1,1096,56,10,22],'eq', 3);
r = l.index(1096);
assert(r,0,'eq',4);
r = l.index(1096,2);
assert(r,5,'eq',5);
r = l.index(1096,5,7);
assert(r,5,'eq',6);
r = l.pop()
assert(l.base_list,[1096, 23,4, 98, 1,1096,56,10],'eq','7a');
assert(r,22,'eq','7b');
r = l.pop(3);
assert(l.base_list,[1096, 23, 4, 1,1096,56,10],'eq','8a');
assert(r,98,'eq','8b');
l.remove(1096);
assert(l.base_list,[23, 4, 1,1096,56,10],'eq', 9);
l.reverse();
assert(l.base_list,[10, 56, 1096, 1, 4, 23],'eq', 10);

l.sort()
assert(l.base_list,[1, 4, 10, 23, 56, 1096],'eq', 11);

l.extend([210, 205, 300]);
assert(l.base_list,[1, 4, 10, 23, 56, 1096, 210, 205, 300],'eq', 12);
l.extend(new List(5,6,7));
assert(l.base_list,[1, 4, 10, 23, 56, 1096, 210, 205, 300,5,6,7],'eq', 13);


// test primitive strings
l = new List('def', 'abc', 'zkl', 'bba', 'abc');
var r = l.count('abc');
assert(r,2,'eq', 21);
l.append('zaf');
assert(l.base_list,['def', 'abc', 'zkl', 'bba', 'abc', 'zaf'],'eq', 22);
l.insert(3,'cadaz');
assert(l.base_list,['def', 'abc', 'zkl', 'cadaz', 'bba', 'abc', 'zaf'],'eq', 23);
r = l.index('cadaz');
assert(r,3,'eq',24);
r = l.index('abc',2);
assert(r,5,'eq',25);
r = l.index('abc',5,7);
assert(r,5,'eq',26);
r = l.pop()
assert(l.base_list,['def', 'abc', 'zkl', 'cadaz', 'bba', 'abc'],'eq','27a');
assert(r,'zaf','eq','27b');
r = l.pop(3);
assert(l.base_list,['def', 'abc', 'zkl', 'bba', 'abc'],'eq','28a');
assert(r,'cadaz','eq','28b');
l.remove('abc');
assert(l.base_list,['def', 'zkl', 'bba', 'abc'],'eq', 29);
l.reverse();
assert(l.base_list,['abc', 'bba', 'zkl', 'def'],'eq', 30);
l.sort()
assert(l.base_list,['abc', 'bba', 'def', 'zkl'],'eq', 31);
l.extend([210, 205, 300]);
assert(l.base_list,['abc', 'bba', 'def', 'zkl',210, 205, 300],'eq', 32);
l.extend(new List('a', 'b', 'c'));
assert(l.base_list,['abc', 'bba', 'def', 'zkl',210, 205, 300,'a', 'b', 'c'],'eq', 33);

// object with single property
console.log('');
l = new List({z:1}, {abc:5}, {zzz:45}, {aaa:13}, {z:1})
var r = l.count({z:1});
assert(r,2,'eq', 51);
l.append({adr: 'abcdef'});
assert(l.base_list,[{z:1}, {abc:5}, {zzz:45}, {aaa:13}, {z:1}, {adr: 'abcdef'}],'eq', 52);
l.insert(3,{w:24});
assert(l.base_list,[{z:1}, {abc:5}, {zzz:45}, {w:24}, {aaa:13}, {z:1}, {adr: 'abcdef'}],'eq', 53);
r = l.index({w:24});
assert(r,3,'eq',54);
r = l.index({w:24},2);
assert(r,3,'eq',55);
r = l.index({w:24},3,7);
assert(r,3,'eq',56);
r = l.pop();
assert(l.base_list,[{z:1}, {abc:5}, {zzz:45}, {w:24}, {aaa:13}, {z:1}],'eq', 57);
r = l.pop(4);
assert(l.base_list,[{z:1}, {abc:5}, {zzz:45}, {w:24}, {z:1}],'eq', 58);
l.remove({zzz:45});
assert(l.base_list,[{z:1}, {abc:5}, {w:24}, {z:1}],'eq', 59);
l.extend(new List({wer: 'a'}, {rus:'b'}, {vuw:'c'}));
assert(l.base_list,[{z:1}, {abc:5}, {w:24}, {z:1},{wer: 'a'}, {rus:'b'}, {vuw:'c'}],'eq', 60);
l.sort()
assert(l.base_list,[{'abc': 5}, {'rus': 'b'}, {'vuw': 'c'}, {'w': 24}, {'wer': 'a'}, {'z': 1}, {'z': 1}],'eq', 61);

// object with multiple properties

