app
.directive('d3Sunburst', ['d3Service', '$window', function(d3Service, $window) {
  return {
    restrict: 'EA',
    scope: {
      'data': '=',
      'type': '=',
      'template-id': '@'
    },
    transclude: true,
    templateUrl: 'app/templates/graphs/stub.html',
    link: function(scope, element, attrs) {
      scope.handleEvent = function(d) {
        eventName = scope.type + 'ClickEvent'
        scope.$emit(eventName, {data: d, type: scope.type});
      }
      scope.draw = function() {
        d3Service.d3().then(function(d3) {

        var width = 450,
            height = 500,
            radius = Math.min(width, height) / 2;

        var x = d3.scale.linear()
            .range([0, 2 * Math.PI]);

        var y = d3.scale.sqrt()
            .range([0, radius]);

        var color = d3.scale.category20c();

        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

        var partition = d3.layout.partition()
            .sort(null)
            .value(function(d) { return 1; });

        var arc = d3.svg.arc()
            .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
            .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
            .innerRadius(function(d) { return Math.max(0, y(d.y)); })
            .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

        // Keep track of the node that is currently being displayed as the root.
        var node;

        // d3.json("/d/4063550/flare.json", function(error, root) {
        node = scope.data;

        var path = svg.datum(scope.data).selectAll("path")
            .data(partition.nodes)
          .enter().append("path")
            .attr("d", arc)
            .attr("stroke", "#fff")
            .attr("stroke-width", ".1px")
            .style("fill", function(d) { return color((d.children ? d : d.parent).url); })
            .on("click", click)
            .each(stash);

        // d3.selectAll("input").on("change", function change() {
        //   var value = this.value === "count"
        //       ? function() { return 1; }
        //       : function(d) { return d.size; };

        //   path
        //       .data(partition.value(value).nodes)
        //     .transition()
        //       .duration(1000)
        //       .attrTween("d", arcTweenData);
        // });

        function click(d) {
          scope.handleEvent(d);
          node = d;
          path.transition()
            .duration(500)
            .attrTween("d", arcTweenZoom(d));
        }

        d3.select(self.frameElement).style("height", height + "px");

        // Setup for switching data: stash the old values for transition.
        function stash(d) {
          d.x0 = d.x;
          d.dx0 = d.dx;
        }

        // When switching data: interpolate the arcs in data space.
        function arcTweenData(a, i) {
          var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
          function tween(t) {
            var b = oi(t);
            a.x0 = b.x;
            a.dx0 = b.dx;
            return arc(b);
          }
          if (i == 0) {
           // If we are on the first arc, adjust the x domain to match the root node
           // at the current zoom level. (We only need to do this once.)
            var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
            return function(t) {
              x.domain(xd(t));
              return tween(t);
            };
          } else {
            return tween;
          }
        }

        // When zooming: interpolate the scales.
        function arcTweenZoom(d) {
          var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
              yd = d3.interpolate(y.domain(), [d.y, 1]),
              yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
          return function(d, i) {
            return i
                ? function(t) { return arc(d); }
                : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
          };
        }
      });
      }

      scope.draw();

      scope.$on('redraw', function() {
        console.log('Redraw?');
        $($(element).find('svg')).remove();
        scope.draw();
      })
    }
  };
}]);