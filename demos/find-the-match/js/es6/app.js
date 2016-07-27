;(function(){
	let soundAttempt = new Audio("sounds/click.wav");
	let soundSuccess = new Audio("sounds/success.wav");
	let soundAttemptIE = new Audio("sounds/click.mp3");
	let soundSuccessIE = new Audio("sounds/success.mp3");
	let fillArray = function(arr){
		for(let i = 0; i < 16; i++){
			arr.push({id: 0});
		}
		for(let i = 0; i < 16; i++) {
			let count = 0,
				flag = true,
			    randNumber = Math.floor(Math.random() * 8 + 1);
			for (let j = 0; j < 16; j++){
				if (arr[j].id === randNumber) count++;
				if (count === 2) {
					flag = false;
					break;
				}
			}
			if (!flag){
				i--;
				continue;
			}
			else {
				arr[i].id = randNumber;
			}
		}
	};
	let ifIE = function(){
		let sAgent = window.navigator.userAgent;
	    let Idx = sAgent.indexOf("MSIE");

	    // If IE, return version number.
	    if (Idx > 0) 
	      return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

	    // If IE 11 then look for Updated user agent string.
	    else if (!!navigator.userAgent.match(/Trident\/7\./)) 
	      return 11;

	    else
	      return 0; //It is not IE
	};
	let app = angular.module('app', []);
	app.controller('mainCtrl', function($scope, $timeout){
		let selectedFirst, 
			selectedSecond, 
			prevTile, 
			count = 0,
			openTilesCount = 0;
		$scope.gameOver = false;
		$scope.rounds = 1;
		$scope.tiles = [];
		$scope.flip = function(i){
			count++;
			if (count <= 2) {
				if (prevTile !== i
					&& !$scope.tiles[i].fixed) {
					$scope.tiles[i].selected = true;
					if (count === 1) prevTile = i;
					else if(count === 2) {
						if ($scope.tiles[prevTile].id === $scope.tiles[i].id 
							&& prevTile !== i) {
							$timeout(function(){
								$scope.tiles[i].fixed = $scope.tiles[prevTile].fixed = true;
								openTilesCount += 2;
								count = 0;
								prevTile = undefined;
								if (ifIE() > 0) soundSuccessIE.play();
								else soundSuccess.play();
								$scope.rounds++;
								if (openTilesCount === 16) $scope.gameOver = true;
							}, 1000);
						}
						else {
							$timeout(function(){
								$scope.tiles[i].selected = $scope.tiles[prevTile].selected = false;
								count = 0;
								prevTile = undefined;
								if (ifIE() > 0) soundAttemptIE.play();
								else soundAttempt.play();
								$scope.rounds++;
							}, 1000);
						}
					}
				}
				else count--;
			}
		};
		$scope.newGame = function(el) {
			if ($scope.gameOver) $scope.gameOver = false;
			$scope.tiles = [];
			fillArray($scope.tiles);
			if (el === 'pop-up') {
				$timeout(function(){
					openTilesCount = 0;
					$scope.rounds = 1;
				}, 500);
			}
			else {
				openTilesCount = 0;
				$scope.rounds = 1;
			}
			
		};
		fillArray($scope.tiles);

	}); // controller
})();