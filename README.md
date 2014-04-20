angular-vega
------------

Angular directive for rendering vega specs.

### Usage

```html
<div vega spec="spec" vega-data="testData" vega-renderer="'svg'"></div>
```

Where `spec` is `$scope.spec` in your controller.

`vega-data` (optional) can be used to pass dynamic data. In the example above, it is bound to `$scope.testData`.

`vega-renderer` (optional) can be used to set renderer (canvas or svg).

See example folder for full usage. See [vega documentation](http://trifacta.github.io/vega/) and [vega editor](http://trifacta.github.io/vega/editor/) for how to construct vega specs.
