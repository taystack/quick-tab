// Directives and animations.
app
.directive('tabItem', ['$http', 'processService', function($http, processService) {
  return {
    restrict: 'EA',
    scope: {
      tab: '='
    },
    transclude: true,
    link: function(scope, el, attrs) {
      processService.tabProcesses(scope.tab.id)
        .then(function(items) {
          processService.getProcessInfo(items)
            .then(function(proc) {
              scope.tab.processes = proc;
              scope.$emit('processesFetched', {tab: scope.tab});
            })
        });
    },
    templateUrl: 'app/templates/windows/TabItem.html'
  }

}]);