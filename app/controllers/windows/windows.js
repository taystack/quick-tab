app
.controller('WindowsCtrl', ['$scope', 'windowsService',
  function($scope, windowsService) {

    console.log($scope)

    if (! $scope.wItems) {
      windowsService.getWindows()
        .then(function(items) {
          console.log(items)
          $scope.wItems = items;
        });
    }

    // TODO: use chrome.storage for these values.
    chrome.windows.onCreated.addListener(function(windowItem) {
      $scope.wItems.push(windowItem);
      $scope.$digest();
    });

    chrome.windows.onRemoved.addListener(function(windowItem) {
      scope.wItems = _.reject($scope.wItems, function(wItem) {return wItem.id === windowItem.id});
      $scope.$digest();
    });

    chrome.windows.onFocusChanged.addListener(function(windowId) {
      _.findWhere(scope.wItems, {focused: true}).focused = false;
      _.findWhere(scope.wItems, {id: windowId}).focused = true;
      $scope.$digest();
    });

}])
