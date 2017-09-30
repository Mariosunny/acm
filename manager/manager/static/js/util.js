function inherit(parent, child) {

	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
};