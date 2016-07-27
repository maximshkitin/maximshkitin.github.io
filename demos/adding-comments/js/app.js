var app = angular.module('commentApp', []);


app.controller('Ctrl', function Ctrl($scope) {
	$scope.reviews = {
		contacts: [{
            name: "Joe",
            email: "some@gmail.com",
            comment: "Very nice!",
            createdOn: "Jun 23, 1916"
    }]
	};

  this.review = {};
  this.review.createdOn = Date.now();
  this.addReview = function() {
    console.log($scope.reviews);
    $scope.reviews.contacts.push(this.review);
    this.review = {};
  };
});
 app.directive('commentDir', function(){
    return {
      restrict: 'E',
      templateUrl: 'js/comment.html',
    };
});