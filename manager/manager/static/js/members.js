(function() {

	var URL_PREFIX = "members";

	function Member(firstName, lastName, ACMnumber, email, role, classification, table) {

		this.firstName = firstName;
		this.lastName = lastName;
		this.fullName = firstName + " " + lastName;
		this.ACMnumber = ACMnumber;
		this.email = email;
		this.role = role;
		this.classification = classification;
		this.table = table;
	}

	function Role(name, displayName) {

		this.name = name;
		this.displayName = displayName || name;
	}

	function Classification(name) {

		this.name = name;
	}

	function AvailabilityTable(days) {

		if(!days) {

			this.days = [
				[false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false]
			];
		}
		else {

			this.days = days;
		}
	}

	Role.prototype.toString = function() {

		return this.displayName;
	}

	var roles = [
		new Role("Chair"),
		new Role("Vice Chair"),
		new Role("PR Officer"),
		new Role("Secretary"),
		new Role("Treasurer"),
		new Role("Advisor"),
		new Role("Member", "-")
	];

	var DEFAULT_ROLE = roles[6];

	var classifications = [
		new Classification("Student"),
		new Classification("Faculty"),
		new Classification("Other")
	];

	var members = [];

	function ajax(url, callback) {

		url.unshift(URL_PREFIX);

		$.get({
			url: url.join("/"),
			success: callback
		});
	}

	app.module.controller('members', function($scope) {

		$scope.members = members;
		$scope.hiddenMembers = [];
		$scope.selectedMembers = [];
		$scope.selectedList = 'members';
		$scope.addMember = false;
		$scope.isTimeslotCountHidden = false;
		$scope.search = function() {

			$scope.hiddenMembers = [];

			if(!$scope.searchInput) {

				return;
			}

			$scope.members.forEach(function(member) {

				var term = $scope.searchInput.toLowerCase();

				if(!(member.fullName.toLowerCase().includes(term) || member.email.toLowerCase().includes(term) || member.ACMnumber.includes(term))) {

					$scope.hiddenMembers.push(member);
				}
			});
		};
		$scope.getSelectedMembersList = function() {

			var sortedMembers = $scope.selectedMembers.sort(function(a, b) {

				var compare = a.lastName.localeCompare(b.lastName);

				if(compare == 0) {

					compare = a.firstName.localeCompare(a.firstName);
				}

				return compare;
			});

			var string = "";

			for(var i = 0; i < sortedMembers.length; i++) {

				if(i != 0) {

					string += ", ";
				}

				string += sortedMembers[i].fullName;
			}

			return string;
		};
		$scope.getSelectedMembersEmailList = function() {

			var sortedMembers = $scope.selectedMembers.sort(function(a, b) {

				var compare = a.lastName.localeCompare(b.lastName);

				if(compare == 0) {

					compare = a.firstName.localeCompare(a.firstName);
				}

				return compare;
			});

			var string = "";

			for(var i = 0; i < sortedMembers.length; i++) {

				if(i != 0) {

					string += ", ";
				}

				string += sortedMembers[i].email;
			}

			return string;
		};
		$scope.isHidden = function(member) {

			return $scope.hiddenMembers.includes(member);
		}
		$scope.select = function(member) {

			if($scope.selectedMembers.includes(member)) {

				$scope.selectedMembers.splice($scope.selectedMembers.indexOf(member), 1);
			}
			else {

				$scope.selectedMembers.push(member);
			}
		};
		$scope.isSelected = function(member) {

			return $scope.selectedMembers.includes(member);
		};
		$scope.selectAll = function() {

			$scope.selectedMembers = [];

			if($scope.inputSelectAll) {

				$scope.members.forEach(function(member) {

					$scope.selectedMembers.push(member);
				});
			}
		};
		$scope.newMember = function() {

			$scope.members.push(new Member(
				$scope.firstName,
				$scope.lastName,
				$scope.ACMnumber,
				$scope.email,
				DEFAULT_ROLE,
				classifications[$scope.classification],
				new AvailabilityTable()
				));

			$scope.firstName = null;
			$scope.lastName = null;
			$scope.ACMnumber = null;
			$scope.email = null;
			$scope.classification = "0";
		};
		$scope.removeAll = function() {

			$scope.selectedMembers.forEach(function(member) {

				$scope.members.splice($scope.members.indexOf(member), 1);
			});

			$scope.selectedMembers = [];
		};
		$scope.getSelectedMember = function() {

			return $scope.selectedMembers[0];
		};
		$scope.getTimeslotColor = function(day, time) {

			var numberOfSelected = 1.0*$scope.selectedMembers.length;
			var timeslotCount = $scope.getTimeslotCount(day, time);

			if(timeslotCount == 0) {

				return "white";
			}

			var lightness = (1.0 - timeslotCount/numberOfSelected)*65 + 35;

			return "hsl(120, 100%, " + lightness + "%)";
		};
		$scope.getTimeslotCount = function(day, time) {

			var count = 0;

			$scope.selectedMembers.forEach(function(member) {

				if(member.table.days[day][time]) {

					count++;
				}
			});
			
			if(count == 0) {

				return "";
			}

			return count;
		};
		$scope.selectTimeslot = function(day, time) {

			var timeslotCount = $scope.getTimeslotCount(day, time);

			$scope.selectedMembers.forEach(function(member) {

				if(timeslotCount > 0) {

					member.table.days[day][time] = false;
				}
				else {

					member.table.days[day][time] = true;
				}
			});
		};
		$scope.getTimeslotTitle = function(day, time) {

			var names = [];

			$scope.selectedMembers.forEach(function(member) {

				if(member.table.days[day][time]) {

					names.push(member.fullName);
				}
			});

			return names.join(", ");
		};
	});

	ajax(["init"], function(data) {

		loadRoles(data.roles);
		loadClassifications(data.classifications);
		loadMembers(data.members);

		for(var i = 0; i < membersData.length; i++) {


		}
	});

	function loadRoles(data) {

		for(var i = 0; i < data.length; i++) {

			var r = data[i];

			roles.push(new Role(r.name, r.displayName))
		}
	}

	return {

	};
})();