app
.controller('DownloadsCtrl', ['$scope', 'downloadsService',
  function($scope, downloadsService) {
    // TODO: use chrome.storage for these values.
    chrome.downloads.onCreated.addListener(function(downloadItem) {
      $scope.dItems.push(downloadItem);
      $scope.$digest();
    });

    $scope.$on('show', function($event, fileId) {
      chrome.downloads.show(fileId);
    });

}])
