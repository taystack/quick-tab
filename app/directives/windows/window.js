// Directives and animations.
app
.directive('windowItem', function() {
  return {
    restrict: 'EA',
    scope: {
      item: '='
    },
    transclude: true,
    link: function(scope) {
      console.log('browser window', scope.item);
    },
    templateUrl: 'app/templates/windows/WindowItem.html'
  }

});