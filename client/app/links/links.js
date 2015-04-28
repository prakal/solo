angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  console.log('gets to LinksController from redirect');
  $scope.data = {};
  $scope.getLinks = function () {
    Links.getAll()
      .then(function (links) {
        $scope.data.links = links.data;
        console.log('$scope.data.links',$scope.data.links);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.getLinks();
});
