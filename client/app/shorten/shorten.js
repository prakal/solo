angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here

  $scope.link = {};
  $scope.addLink = function () {
    $scope.loading = true;
    Links.addLink($scope.link, function(){
      $scope.loading = false;
      console.log('managed to avoid callback hell');
      $location.path('/');
    });
      // .then(function () {

      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  };
});
