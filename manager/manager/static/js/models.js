function Model() {

}

Model.prototype.loadList = function(data) {

	var list = [];

	for(var i = 0; i < data.length; i++) {

		list.push(this.load(data[i]));
	}

	return list;
};

Model.prototype.load = function(data) {

	var object = new this();

	for(var property in this.fields) {

		object[property] = this.fields[property].load(data[property])
	}

	return object;
};

Model.prototype.get = function(property) {

	return this[property].getValue();
}

function ModelField() {

}

function ObjectField(model) {

	this.model = model;
}

inherit(ModelField, ObjectField);

ObjectField.prototype.load = function(data) {

	return this.model.find(data);
};

function CharField() {

	ModelField.call(this);
}

inherit(ModelField, CharField);

CharField.prototype.load = function(data) {

	return data;
};

