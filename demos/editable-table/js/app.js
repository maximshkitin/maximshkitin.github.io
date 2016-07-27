var app = angular.module('app', []);

app.controller('mainCtrl', function($scope, $http) {
	$http.get('js/users.json').success(function(data){
		$scope.model = data;
		console.log($scope.model);
	}).error(function(){
		alert('Errorka!');
	});
	$scope.selected = {}
	$scope.getTemplate = function (user) {
        if (user.id === $scope.selected.id) return 'edit';
        else return 'display';
    };
    $scope.checkForFill = function(){
    	$scope.eachFilled = true;
    	for (var obj of $scope.model.users){
    		if(obj.name == undefined || obj.surname == undefined ||
    		   obj.age == undefined || obj.gender == undefined) $scope.eachFilled = false;
	    };
	     if($scope.eachFilled) return true;
	     else return false;
    };
    $scope.addUser = function(){
    	// generate id for first element
    	var maxId = $scope.model.users[0].id;
    	for (var i = 1; i < $scope.model.users.length; i++){
    		if (maxId < $scope.model.users[i].id)
    			maxId = $scope.model.users[i].id;
    	}
    	$scope.model.users.unshift({});
    	$scope.model.users[0].id = maxId + 1;
    	$scope.selected.id = maxId + 1;
    };
    $scope.deleteUser = function(idx){
    	var result = confirm('Are you sure?');
    	if (result) $scope.model.users.splice(idx,1);
    	$scope.checkForFill();
    };
    $scope.editUser = function (user) {
        $scope.selected = angular.copy(user);
    };

    $scope.saveUser = function (idx) {
    	console.log($scope.model);
        $scope.model.users[idx] = angular.copy($scope.selected);
        $scope.reset();
        $scope.checkForFill();
    };
    $scope.reset = function () {
        $scope.selected = {};
    };


    // sorting
    $scope.sortField = undefined;
    $scope.reverse = false;
    $scope.sort = function(fieldName) {
    	if ($scope.sortField === fieldName) $scope.reverse = !$scope.reverse;
    	else {
    		$scope.sortField = fieldName;
    		$scope.reverse = true;
    	}
    	if (fieldName === 'age') {
    		if($scope.checkForFill()) {
    			if ($scope.reverse) {
	    			$scope.model.users.sort(function(obj1,obj2){
		    			return obj1.age - obj2.age;
		    		});
	    		}
	    		else {
	    			$scope.model.users.sort(function(obj1,obj2){
		    			return obj1.age - obj2.age;
		    		}).reverse();
	    		}
	    	}
	    	else {
	    		alert('Wow, easy! Firstly, you should to fill out each rows!');
	    	}
    	}
    	else {
    		if($scope.checkForFill()){
	    		if ($scope.reverse) {
	    			$scope.model.users.sort(function(obj1, obj2){
		    			var name1 = obj1[fieldName].toLowerCase();
		    			var name2 = obj2[fieldName].toLowerCase();
		    			if (name1 < name2) return -1;
		    			else if (name1 > name2) return 1;
		    			else return 0;
		    		});
	    		}
	    		else {
	    			$scope.model.users.sort(function(obj1, obj2){
		    			var name1 = obj1[fieldName].toLowerCase();
		    			var name2 = obj2[fieldName].toLowerCase();
		    			if (name1 < name2) return -1;
		    			else if (name1 > name2) return 1;
		    			else return 0;
		    		}).reverse();
	    		}
	    	}
	    	else {
	    		alert('Wow, easy! Firstly, you should to fill out each rows!');
	    	}
    	}
    }
});

