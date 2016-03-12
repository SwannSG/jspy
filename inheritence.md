(function() {

	var global_name = 'xyz';

	var main = function() {






	};

    // test for global window object, as Spider Monkey standalone does not have it
    if (typeof(window) === 'object') {
        //define globally if it doesn't already exist
        if (typeof(window[global_name]) === 'undefined') {
            // add the new name to global space
            window[global_name] = main();
        }
        else {
            console.log('Global name ' + global_name + ' already defined.');
        }
    }
    else {
        // Spider Monkey unknown global name
        // use eval
        var eval_str = global_name + ' = main()';
        eval(eval_str);
    }

})();
