ng-vega
------------

Angular directive for rendering vega specs.
This project was forked from angular-vega.
I have made major changes in the directive and update the example.

### Usage

```javascript
angular.module('exampleApp', ['ngVega'])
```

```html
<div vega spec="spec" vega-data="testData" vega-renderer="'svg'"></div>
```

Where `spec` is `$scope.spec` in your controller.

`vega-data` (optional) can be used to pass dynamic data. In the example above, it is bound to `$scope.testData`.

`vega-renderer` (optional) can be used to set renderer (canvas or svg). Don't forget the quote

See

- [Simple demo](http://kristw.github.io/ng-vega) ([view code](https://github.com/kristw/ng-vega/blob/master/index.html))
- [Vega editor demo](http://kristw.github.io/ng-vega/editor.html) -- AngularJS version of the editor with syntax highlighting

For more information about Vega, please refer to [vega documentation](http://trifacta.github.io/vega/) and the original [vega editor](http://trifacta.github.io/vega/editor/).
