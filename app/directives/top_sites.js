// Directives and animations.
app
.directive('topsiteitem', function() {
  return {
    restrict: 'EA',
    scope: {
      item: '='
    },
    transclude: true,
    link: function(scope) {
    },
    templateUrl: 'app/templates/top_sites.html'
  }

});