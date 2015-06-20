// Controllers
app
.controller('MainCtrl', ['$scope', 'historyService', 'downloadsService', function($scope, historyService, downloadsService) {
  $scope.mainSearch = '';
  $scope.hItems = [];
  $scope.dItems = [];
  $scope.tsItems = [];

  $scope.getAll = function(query) {
    historyService.getHistory(query)
      .then(function(items) {
        $scope.hItems = items;
      });
    downloadsService.getDownloads(query.split(","))
      .then(function(items) {
        $scope.dItems = items;
      });
    chrome.topSites.get(function(items) {
      console.log(items)
      $scope.tsItems = items;
    });
  }

  $scope.getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
  };

  $scope.setFilter = function($event) {
    $scope.$broadcast('filter', $scope.mainSearch);
  }

  $scope.getAll("");
}]);