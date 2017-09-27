var teams = [];

function Team(name, members) {

	this.name = name;
	this.members = members;
}

function TeamPosition(name) {

	this.name = name;
}

function TeamMember(member, position) {

	this.member = member;
	this.position = position;
}