// Directives and animations.
app
.directive('downloaditem', function() {
  return {
    restrict: 'EA',
    scope: {
      item: '='
    },
    transclude: true,
    link: function(scope) {
      scope.getFilenameOrHostname = function(downloadItem) {
        if (downloadItem.filename.length) {
          return downloadItem.filename;
        }
        return scope.$parent.getLocation(downloadItem.url);
      };

      scope.show = function() {
        scope.$emit('show', scope.item.id);
      }
    },
    templateUrl: 'app/templates/downloads/DownloadItem.html'
  }

});