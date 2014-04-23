// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/amdWeb.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['angular', 'vega', 'ng-debounce'], factory);
  } else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    factory(root.angular, root.vg);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (angular, vg) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

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

  return ngVega;

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));



