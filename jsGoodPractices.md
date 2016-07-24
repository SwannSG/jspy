##Javascript Good Practices##

###Don't pollute the Global Namespace###

Use a Module Pattern (with one global variable).

Other variables and methods are referenced inside the module via the single global variable.

var myOneGlobalVariable = (function() {
    var modulePrivateVariableOne = 10;
    var modulePrivateMethodOne = function modulePrivateMethodOne() {
        //do something
        };

    return {
        modulePublicVaribleOne = 'hello';
        modulePublicMethodOne = function modulePublicMethodOne () {
            return modulePrivateMethodOne();
        }
    }
})();

myOneGlobalVariable.modulePublicVariableOne;        //helllo
myOneGlobalVariable.modulePublicMethodOne();
