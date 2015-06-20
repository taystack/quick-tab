app
.controller('HistoryCtrl', [
  '$scope', 'historyService',
  function($scope, historyService) {
    $scope.filter = '';
    $scope.$parent.showSearch = true;

    // TODO: use chrome.storage for these values.


    chrome.history.onVisited.addListener(function(historyItem) {
      var exists = _.findWhere($scope.hItems, {url: historyItem.url});
      if (exists !== undefined) {
        if (exists.visitCount < historyItem.visitCount) {
          exists.visitCount = historyItem.visitCount;
          exists.lastVisitTime = historyItem.lastVisitTime;
        }
      } else {
        $scope.historyItems.push(historyItem);
      }
      $scope.$digest();
    });

    $scope.$on('filter', function($event, filter) {
      $scope.filter = filter;
    });

    $scope.$on('$destroy', function() {
      $scope.$parent.showSearch = false;
    });

}])
.controller('HistoryGraphCtrl', [
  '$scope', 'historyService',
  function($scope, historyService) {
    $scope.dataKey = 'visitCount';
    $scope.filter = '';
    $scope.$parent.showSearch = true;

    chrome.history.onVisited.addListener(function(historyItem) {
      var exists = _.findWhere($scope.historyItems, {url: historyItem.url});
      if (exists !== undefined) {
        if (exists.visitCount < historyItem.visitCount) {
          exists.visitCount = historyItem.visitCount;
          exists.lastVisitTime = historyItem.lastVisitTime;
        }
      } else {
        $scope.historyItems.push(historyItem);
      }
      $scope.$digest();
    });

    $scope.flareData = histograph.prepareFlareData($scope.hItems);

    // Event Handlers;
    $scope.$on('filter', function($event, filter) {
      $scope.filter = filter;
    });

    $scope.$on('$destroy', function() {
      $scope.$parent.showSearch = false;
    });

}]);
