// Directives and animations.
app
.directive('historyItem', function() {
  return {
    restrict: 'EC',
    scope: {
      item: '='
    },
    transclude: true,
    templateUrl: 'app/templates/history/history_item.html',
    link: function(scope, el, attrs) {
      scope.visitItems = [];

      scope.titleOrHostname = function(item) {
        if (item.title.length) {
          return item.title;
        }
        return scope.$parent.getLocation(item.url);
      };

      scope.humanizeTimestamp = function(timestamp) {
        return moment.unix(timestamp || scope.item.lastVisitTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
      };

      scope.toggleVisitItems = function() {
        if (scope.showVisitItems) {
          scope.showVisitItems = ! scope.showVisitItems;
        } else {
          scope.fetchVisits();
          scope.showVisitItems = true;
        }
      };

      scope.fetchVisits = function() {
        chrome.history.getVisits({'url': scope.item.url}, function(visitItems) {
          scope.visitItems = visitItems;
          scope.$digest();
        });
      };
    }
  }

});