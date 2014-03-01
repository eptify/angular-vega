var ngVega = angular.module('ngVega', []);

ngVega.directive('vega', function() {
    function link(scope, element, attrs) {
        scope.$watch('spec', function () {
            vg.parse.spec(scope.spec, function(chart) {
                chart({el:"#"+attrs.id}).update();
             })
        }, true)
    }

    return {
        restrict: 'A',
        link: link,
        scope: {
            spec: '='
        }
    }
});
