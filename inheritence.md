var Methods = function() {

	Methods.prototype.addition = function(x,y) {return x+y;};

	return this;
}


var m = Methods();






/*
var ClassA = function(x,y) {
	if (typeof(this.RegExp) === 'function') {
		throw new Error('constructor Name called without "new" keyword');
		}
	this.x = x;
	this.y = y;
	
	if (typeof(ClassA.prototype.add)!=='function') {
			ClassA.prototype.add = function() {return this.x + this.y;};
		}

	return this;
}

var a = new ClassA(10,5);

var b = Object.assign(Object.create(ClassA))

var ClassB = function(a,b) {
	if (typeof(this.RegExp) === 'function') {
		throw new Error('constructor Name called without "new" keyword');
		}
	this.a = a;
	this.b = b;
	
	return Object.assign(Object.create(ClassA), this);
}
*/
