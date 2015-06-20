app
.controller('TopSitesCtrl', ['$scope',
  function($scope, topSitesService) {
    $scope.siteItems = [];

    chrome.topSites.get(function(items) {
      $scope.siteItems = items;
    });

}])
