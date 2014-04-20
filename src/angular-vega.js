var ngVega = angular.module('ngVega', ['debounce']);

ngVega.directive('vega', ['debounce', function(debounce) {
  return {
    restrict: 'AE',
    scope: {
      spec: '=',
      data: '=vegaData',
      renderer: '=vegaRenderer'
    },
    link: function(scope, element, attrs) {
      var dom = element[0];
      var view;

      function parse(){
        console.log('parse', scope.renderer);

        vg.parse.spec(scope.spec, function(chart) {
          view = chart({
            el: dom,
            data: scope.data,
            renderer: scope.renderer || 'canvas'
          }).update();
        });
      }

      var debouncedParse = debounce(parse, 100);

      scope.$watch('spec', debouncedParse, true);

      scope.$watch('data', function(data){
        if(view){
          console.log('update data');
          view.data(data).update().render();
        }
        else{
          debouncedParse();
        }
      }, true);

      scope.$watch('renderer', function(renderer){
        if(view){
          view.renderer(renderer).update();
        }
        else{
          debouncedParse();
        }
      });
    }
  };
}]);
