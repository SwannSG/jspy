/**
 * Created by swannsg on 2016/02/27.
 * lodash.js is a dependency
 *      only _.isEqual() method is used
 */

(function(){


    // can change global name of package here
    var global_name = 'py';

    // return explicit object type
    // [ConstructorName, string_to_return]
    // py.type(obj) --> if List type returns 'list'
    var OBJ_TYPES = [
        ['List', 'list'],
        ['Test', 'test']
    ]



    var py_lite = function() {
        'use strict';
        var count = function(value) {
            /*
             return number of occurrences in arr
             value may be primitive or object
             */
            var occurrences = 0;
            this.arr.forEach(function(each) {
                    if (_.isEqual(value,each)) {
                        occurrences++;
                    }
                }
            );
            return occurrences;
        };

        var append = function(object) {
            /*
             append to list
             object is added at the end to the list
             */
            this.arr.push(object);
        };

        var insert = function(index, object) {
            // insert 'object' into list at position 'index'
            this.arr.splice(index, 0, object);
        };

        var index = function(value) {
            /*
             l.index(value, [start], [stop])
             returns the index of the first object in the list = value
             returns false if the object is not found
             can further specify start, or start+end parameters
             */
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

            for (var i=start; (i<this.arr.length || i<=end);i++) {
                if (_.isEqual(this.arr[i],value)) {
                    return i
                }
            }
            return false;
        };

        var pop = function() {
            /*
             pop element at position 'index'
             if no index, pop last element
             returns popped element
             element is removed from list
             */
            switch (arguments.length) {
                case 0:
                    // pop last element
                    return this.arr.pop();
                case 1:
                    // pop element at index
                    return this.arr.splice(arguments[0],1).pop();
            }
        };

        var remove = function(value) {
            /*
             remove first element found with value = value
             does not return the element
             */
            this.pop(this.index(value));
        };

        var reverse = function() {
            // reverse order of list, in-place
            this.arr.reverse()
        };

        var isPrimitive = function (value) {
            if (typeof(value) === 'string' || typeof(value) == 'number' || typeof(value) == "boolean") {
                return true;
            }
            else { return false;}
        };

        var basicPrimitiveCmp = function(a,b) {
            /*
             values a,b must be primitives
             sorts numeric ascending,
             sorts characters alphabetically
             */
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
        };

        var objectKeyCmp = function(a,b){
            /*
             Compares first key (or property) of an object
             Arranges in key order, not by the value associated with the key
             This will happily sort objects of the form
             [ {key1: value1}, {key2: value2}, ... ] where
             object only has one property and
             value is a primitive

             if the object has multiple properties the results are unreliable.
             This because property order is not guaranteed for an object !!!
             */
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

             For a more complex sort on an objects use the optional parameter
             {cmp: ''                // cmp will use basicPrimitiveCmp()
             key: function to extract the desired key from the object
             reverse: boolean       // reverse the list or not}

             The 'key' function is very useful and must return a primitive.
             yourKeyFn(yourObject) { returns a primitive search key }
             */

            switch (arguments.length) {
                case 0:
                    if (this.arr.every(function (x) {
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
                        this.arr.sort(basicPrimitiveCmp);
                    }
                    else {
                        /*
                         elements are not primitive types, complex objects
                         by default we then make sort 'key' = first local property on object that is a primitive
                         only works reliably for objects with a single property because the order of properties
                         on an object is not guaranteed
                         example: [ {a:1}, {z:3}, {b:8} ] will work and sort on first (and only property)
                         sorted : [ {a:1}, {b:8}, {z:3} ]
                         */
                        var sort_keys = this.arr.map(function(x) {
                            return Object.keys(x)[0];
                        });
                        if (sort_keys.every(function(x) {
                                if (isPrimitive(x)) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })) {
                            this.arr.sort(objectKeyCmp);
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
                        this.arr.sort(function(a,b){
                            var k1 = key(a);
                            var k2 = key(b);
                            if (typeof (cmp) === 'function') {
                                // use passed cmp function
                                return cmp(k1, k2);
                            }
                            else {
                                // use default sort
                                return basicPrimitiveCmp(k1, k2);
                            }
                        });
                    }
                    if (reverse) {
                        this.arr.reverse();
                    }
            }
        };

        var extend = function(x) {
            /*
             pass array or List object
             returns in place extension of list
             */
            if (Array.isArray(x)) {
                // array
                this.arr = this.arr.concat(x);
            }
            else {
                // List object
                this.arr = this.arr.concat(x.arr);
            }
        };

        var displayList = function() {
            return JSON.stringify(this.arr);
        };

        var sorted = function(x) {
            // x is an object over which we can iterate
            if (x===undefined || x===null || typeof(x)==='boolean' || typeof(x)==='number' || typeof(x)==='function') {
                // do nothing
                return false;
            }
            // string is iterable
            if (typeof(x)==='string') {
                var result = new List();
                for (var i= 0; i<x.length; i++) {
                    result.append(x[i]);
                }
            }
            // array is iterable
            else if (Array.isArray(x)) {
                var result = new List();
                for (var i= 0; i<x.length; i++) {
                    result.append(x[i]);
                }
            }
            else if (x instanceof List) {
                // x is List object
                var result = x;
            }
            else {
                // object over whose local properties we can iterate
                // returns local properties names in alphabetical order
                result = new List(Object.getOwnPropertyNames(x));
            }
            if (arguments.length === 2) {
                result.sort(arguments[1]);
            }
            else {
                result.sort()
            }
            return result;
        };


        var type = function(x) {
            if (x===null) {return 'null';}
            var to = typeof(x);

            switch (to) {
                case 'number':
                    // NaN and Infinity are both numbers
                    return 'number';
                    break;
                case 'boolean':
                    return 'boolean';
                    break;
                case 'string':
                    return 'string';
                    break;
                case 'undefined':
                    return 'undefined';
                    break;
                case 'object':
                    if (Array.isArray(x)){return 'array';}
                    if (x instanceof List) {return 'list';}
                    if (x instanceof Date) {return 'date';}
                    // test for user-defined constructors
                    for (var i=0; i<OBJ_TYPES.length;i++) {
                            var expr = 'expr = (typeof ' + OBJ_TYPES[i][0] + '!=="undefined");'
                            eval(expr);
                            // does OBJ_TYPES[i][0] constructor actually exist
                            if (expr) {
                                expr = 'expr = (x instanceof ' + OBJ_TYPES[i][0] + ');';
                                eval(expr);
                                // is OBJ_TYPES[i][0] the constructor for the object
                                if (expr) {
                                    return OBJ_TYPES[i][1];
                                }
                            }
                    }
                    return 'object';
            }
            return 'unknown';
        };

        var List =  function() {
            // List constructor

            this.arr = [];
            // accept individual parameters or a single array
            // List(1,2,3,4) or List([1,2,3,4])
            if (arguments.length===1 && _.isArray(arguments[0])) {
                this.arr = arguments[0];
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    this.arr.push(arguments[i]);
                }
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
            if (typeof(this.stringOf) === 'function') {
                List.prototype.toString = displayList;
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
        List.prototype = {constructor: List,
            toString: displayList};

        return {List: List,
                sorted: sorted,
                type: type};
    };


    // test for global window object, as Spider Monkey standalone does not have it
    if (typeof(window) === 'object')
        //define globally if it doesn't already exist
        if(typeof(window[global_name]) === 'undefined'){
            // add the new name to global space
            window[global_name] = py_lite();
        }
        else{
            console.log("Library already defined.");
        }
    else {
        // Spider Monkey unknown global name
        //eval(global_name + ' = py_lite()');
        load(['lodash.js']);
        py = py_lite();
    }

})();



