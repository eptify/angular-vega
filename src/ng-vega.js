// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/amdWeb.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['angular', 'vega'], factory);
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

  function debounce(func, wait) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      // return caller for chaining
      return context;
    };
  }

  return angular.module('ngVega', [])
    .directive('vega', function() {
      return {
        restrict: 'AE',
        scope: {
          spec: '=',
          data: '=vegaData',
          renderer: '=vegaRenderer'
        },
        link: function(scope, elements, attrs) {
          var view;

          function parse(){
            vg.parse.spec(scope.spec, function(chart) {
              view = chart({
                el: elements[0],
                data: scope.data,
                renderer: scope.renderer || 'svg'
              }).update();
            });
          }

          var debouncedParse = debounce(parse, 100);

          scope.$watch('spec', debouncedParse, true);

          scope.$watch('data', function(data){
            if(view){
              view.data(data)
                .update()
                .render();
            }
            else{
              debouncedParse();
            }
          }, true);

          scope.$watch('renderer', function(renderer){
            if(view){
              view.renderer(renderer)
                .update();
            }
            else{
              debouncedParse();
            }
          });
        }
      };
    });

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));



