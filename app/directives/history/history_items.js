// Directives and animations.
app
.directive('historyItems', function() {
  return {
    restrict: 'EC',
    scope: {
      items: '='
    },
    replace: true,
    transclude: true,
    templateUrl: 'app/templates/history/history_items.html',
    link: function(scope, el, attrs) {
      scope.isExpanded = false;
      scope.flareData = histograph.prepareFlareData(scope.items);

      scope.handleExpand = function() {
        scope.isExpanded = !scope.isExpanded;
        $(el).toggleClass('focused');
      }

      scope.getLocation = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l.hostname;
      };

      scope.showSearch = function() {
        scope.isSearching = true;
      }

      scope.$watch('historyFilter', function(newVal, oldVal) {
        if (newVal && ! _.isEqual(newVal, oldVal)) {
          scope.flareData = histograph.prepareFlareData(scope.filteredItems);
          scope.$broadcast('redraw');
        }
      });

      scope.$on('historyClickEvent', function($event, obj) {
        if (obj.data.id) {
          scope.idFilter = obj.data.id;
        } else {
          scope.idFilter = undefined;
        }
      });
    }
  }
});