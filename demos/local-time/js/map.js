var mapApp = angular.module('mapApp',[]);
mapApp.controller('mainCtrl',function($scope,$http){
	$scope.places = [];
	$scope.map = new google.maps.Map(document.getElementById('map'),{
		center: {
			lat: 45, 
			lng: 25
		},
		zoom: 3
	});
	$scope.tempMarker = {};
	$scope.timeZoneData = {};
	var marker = undefined;
	var time;
	google.maps.event.addListener($scope.map, 'click', function(event) {
	   moveMarker(event.latLng);
	});
	$scope.deletePlace = function(idx) {
		$scope.places.splice(idx,1);
	};
	function getTime(){
		time = parseInt(Date.now() / 1000);
		var long = $scope.tempMarker.long = marker.getPosition().lng().toFixed(6);
		var lat = $scope.tempMarker.lat = marker.getPosition().lat().toFixed(6);
		$http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + long + '&timestamp=' + time + '&key=AIzaSyBX1h5EEwFY90rBLsxOi00Fg_hSu4Qyc4k')
		.success(function(data){
			$scope.timeZoneData = data;
			addPlace();
		})
		.error(function(){
			alert('Error!');
		});
	}
	function addPlace() {
		var dst = $scope.timeZoneData.dstOffset;
		var raw = $scope.timeZoneData.rawOffset;
		time += raw + dst;
		if (isNaN(time)) $scope.tempMarker.time = 'unknown';
		else $scope.tempMarker.time = time * 1000;

		pushToArray();
	}
	function pushToArray() {
		$scope.tempMarker.zoneName = $scope.timeZoneData.timeZoneId;
		$scope.places.unshift($scope.tempMarker);
		$scope.timeZoneData = {};
		$scope.tempMarker = {};
	}
	function moveMarker(location) {
	    if (marker == undefined){
	        marker = new google.maps.Marker({
	            position: location,
	            map: $scope.map,
	            animation: google.maps.Animation.DROP
	        });
	        getTime();
	    }
	    else {
	    	marker.animation = google.maps.Animation.DROP;
	        marker.setPosition(location);
	        getTime();
	    }
	}
});