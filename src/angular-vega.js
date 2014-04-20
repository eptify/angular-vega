var ngVega = angular.module('ngVega', []);

ngVega.directive('vega', function() {
  return {
    restrict: 'AE',
    scope: {
      spec: '='
    },
    link: function(scope, element, attrs) {
      var dom = element[0];
      scope.$watch('spec', function () {
        vg.parse.spec(scope.spec, function(chart) {
          chart({el: dom}).update();
        });
      }, true);
    }
  };
});
