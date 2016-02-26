/**
 * Created by swannsg on 2016/02/24.
 */
load(['lodash.js']);

// python list like object

var count = function(value) {
    // return number of occurrences in base_list
    var occurrences = 0;
    this.base_list.forEach(function(each) {
              if (_.isEqual(value,each)) {
                  occurrences++;
              }
        }
    )
    return occurrences;
};

var append = function(object) {
    // append to list
    this.base_list.push(object);
};

var insert = function(index, object) {
    // insert 'object' into list at position 'index'
    this.base_list.splice(index, 0, object);
};

var index = function(value) {
    // l.index(value, [start], [stop])
    var start = 0;
    var end = 0;
    switch (arguments.length) {
        case 2:
            start = arguments[1];
            break;
        case 3:
            start = arguments[1];
            end = arguments[2];
            break;
    }

    for (var i=start; (i<this.base_list.length || i<=end);i++) {
        if (_.isEqual(this.base_list[i],value)) {
            return i
        }
    }
};

var pop = function() {
    // pop element at position 'index'
    // if no index, pop last element
    switch (arguments.length) {
        case 0:
            // pop last element
            return this.base_list.pop();
        case 1:
            // pop element at index
            return this.base_list.splice(arguments[0],1).pop();
    }
};

var remove = function(value) {
    // remove first element found with value = value
    this.pop(this.index(value));
}

var reverse = function() {
    // reverse order of list, in-place
    this.base_list.reverse()
};

var sort = function() {
    /*  list is sorted in place
        sort can optionally take an additional parameter
            {cmp: fn() {compare}, key: fn() {extract key}, reverse: false}
                cmp     comparison function to be used between elements or extracted key for each element
                    by default sort is lowest to highest
                key     key function - the key to be extracted from a complex object
        sort() will do a lowest to highest sort on the list
            Use for primitive types (strings, numbers, boolean)
            While sort will attempt to sort a complex object (not a primitive) this is not reliable
            as property order is not guaranteed.

    */
    function isPrimitive(value) {
        if (typeof(value) === 'string' || typeof(value) == 'number' || typeof(value) == "boolean") {
            return true;
        }
        else { return false;}
    }

    var basicPrimitiveCmp = function(a,b) {
        // values a,b must be primitives
        // sorts numeric ascending,
        // sorts characters alphabetically
        if (a < b) {
            // a before b
            return -1;
        }
        else if (a > b) {
            // b before a
            return 1;
        }
        else {
            // a == b
            return 0;
        }
    }

    var objectCmp = function(a,b){
        if (Object.keys(a)[0] < Object.keys(b)[0]) {
            // a.key before b.key
            return -1;
        }
        else if ((Object.keys(a)[0] > Object.keys(b)[0])){
            // a.key after b.key
            return 1;
        }
        else {
            // a.key = b.key
            return 0
        }
    }

    switch (arguments.length) {
        case 0:
            if (this.base_list.every(function (x) {
                    if (isPrimitive(x)) {
                        // elements in the list are primitive types
                        return true;
                    }
                    else {
                        // elements in the list are objects
                        return false
                    }
                })) {
                // standard "smallest to biggest" sort on elements in list
                // elements are primitives
                this.base_list.sort(basicPrimitiveCmp);
            }
            else {
                // elements are not primitive types, complex objects
                // by default we then make sort 'key' = first local property on object that is a primitive
                // only works reliably for objects with a single property because the order of properties
                // on an object is not guaranteed
                // example: [ {a:1}, {z:3}, {b:8} ] will work and sort on first (and only property)
                // sorted : [ {a:1}, {b:8}, {z:3} ]


                var sort_keys = this.base_list.map(function(x) {
                                                return Object.keys(x)[0];
                                                });
                if (sort_keys.every(function(x) {
                            if (isPrimitive) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })) {
                    // keys are primitives so we can sort them
                    // [k1, k2, k3, ....] unsorted
                    // and k1 refers to this.base_list[0]
                    // how do we maintain this relationship once we move them around
                    // keys may be duplicated
                    this.base_list.sort(objectCmp);
                }
                else {
                    // extracted key is a complex object, so give up and do nothing
                }
            }
            break;


        case 1:
            // pass object literal
            // {cmp: fn() {compare}, key: fn() {extract key}, reverse: false}
            var cmp = arguments[0].cmp;
            var key = arguments[0].key;
            var reverse = arguments[0].reverse;
            if (typeof (key) === 'function') {
                this.base_list.sort(function(a,b){
                    var k1 = key(a);
                    var k2 = key(b);
                    if (typeof (cmp) === 'function') {
                        // use passed cmp function
                        return cmp(k1, k2);
                    }
                    else {
                        // use default sort
                        return k1-k2;
                    }
                });
            }
            if (reverse) {
                this.base_list.reverse();
            }
    }
};

var extend = function(x) {
    // pass array or List object
    // returns in place extension of list
    if (Array.isArray(x)) {
        // array
        this.base_list = this.base_list.concat(x);
    }
    else {
        // List object
        this.base_list = this.base_list.concat(x.base_list);
    }
}


var List =  function() {
    //console.log(JSON.stringify(arguments));
    this.base_list = [];
    for (var i=0; i< arguments.length; i++) {
        this.base_list.push(arguments[i]);
    }
    if (typeof(this.count) !== 'function') {
        List.prototype.count = count;
    }
    if (typeof(this.append) !== 'function') {
        List.prototype.append = append;
    }
    if (typeof(this.insert) !== 'function') {
        List.prototype.insert = insert;
    }
    if (typeof(this.index) !== 'function') {
        List.prototype.index = index;
    }
    if (typeof(this.pop) !== 'function') {
        List.prototype.pop = pop;
    }
    if (typeof(this.remove) !== 'function') {
        List.prototype.remove = remove;
    }
    if (typeof(this.reverse) !== 'function') {
        List.prototype.reverse = reverse;
    }
    if (typeof(this.sort) !== 'function') {
        List.prototype.sort = sort;
    }
    if (typeof(this.extend) !== 'function') {
        List.prototype.extend = extend;
    }


};

List.prototype = {constructor: List,
    count: count};
List.prototype = {constructor: List,
    count: append};
List.prototype = {constructor: List,
    insert: insert};
List.prototype = {constructor: List,
    index: index};
List.prototype = {constructor: List,
    pop: pop};
List.prototype = {constructor: List,
    remove: remove};
List.prototype = {constructor: List,
    reverse: reverse};
List.prototype = {constructor: List,
    sort: sort};
List.prototype = {constructor: List,
    extend: extend};


/*
l = new List(1,2,3,1,1);


l = new List({1:'a'}, {2:'b'}, {4:'d'}, {3:'c'});


l = new List({'b':'a','a':'z'}, {'2':'b', '6':'y'}, {'4':'d', '3':'f'}, {'3':'c', '27':'def'}, {'29':'c', '28':'def'});

//so = {cmp:'', key:function(x) {return Object.keys(x)[1];}, reverse: false}

l = new List({z:2, m:3}, {b:5, d:6})
*/

//l = new List('abc', 'bba', 'zkl', 'def');
//l.sort()

