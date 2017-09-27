(function() {

	var URL_PREFIX = "inventory";

	function Item(name, quantity) {

		this.name = name;
		this.quantity = quantity;
	}

	var items = [];

	app.module.controller('inventory', function($scope) {

		$scope.items = items;
	});

	function ajax(url, callback) {

		url.unshift(URL_PREFIX);

		$.get({
			url: url.join("/"),
			success: callback
		});
	}

	return {

	};
})();