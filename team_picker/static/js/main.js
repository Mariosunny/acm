var app = angular.module("app", []);
var teams = [];
var UID;
var you;

$(function() {

    UID = $("body").data("uid");
});

app.controller('main', function($scope, $http, $interval) {

    $scope.teams = teams;
    $scope.you = you;
    $scope.repeat = function(n) {

        var list = [];

        for(var i = 0; i < n; i++) {

            list.push(i);
        }

        return list;
    };
    $scope.changeTeam = function(team) {

        if(!team.isFull()) {

            for(var i = 0; i < teams.length; i++) {

                var t = teams[i];

                for(var j = 0; j < t.members.length; j++) {

                    var member = t.members[j];

                    if(member.UID == UID) {

                        $.get({
                            url: '/post',
                            data: {
                                'UID': member.UID,
                                'team': team.getIndex()
                            },
                            success: reload
                        })

                        return;
                    }
                }
            }
        }
    };
    $scope.isSelf = function(member) {

        return UID == member.UID;
    };
    $scope.getSelf = function() {

        if(!teams) {

            return "";
        }

        for(var i = 0; i < teams.length; i++) {

            var t = teams[i];

            for(var j = 0; j < t.members.length; j++) {

                var member = t.members[j];

                if(member.UID == UID) {

                    return member;
                }
            }
        }
    };

    function reload() {

        $http.get("/load").then(function(data) {

            teams.splice(0, teams.length);

            for(var i = 1; i < 13; i++) {

                teams.push(new Team("Team " + i))
            }

            var members = data.data.members;

            for(var i = 0; i < members.length; i++) {

                var member = members[i];
                var m = new Member(member.UID, member.name);

                teams[member.team].members.push(m);
            }
        });
    }

    $interval(function() {

        reload();
    }, 500);
});

function Member(UID, name) {

    this.UID = UID;
    this.name = name;
}

function Team(name) {

    this.name = name;
    this.members = [];
}

Team.prototype.isFull = function() {

    return this.members.length == 5;
}

Team.prototype.getIndex = function() {

    for(var i = 0; i < teams.length; i++) {

        if(teams[i].name == this.name) {

            return i;
        }
    }

    return -1;
}