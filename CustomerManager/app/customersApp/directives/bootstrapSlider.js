'use strict';
define(['app', 'slider'], function (app, slider) {
    var injectParams = ['$q', '$parse', 'dataService'];

    var bootstrapSliderDirective = function () {
        return function (scope, element, attributes) {
            $(document).ready(function () {
                var init = scope.$eval(attributes['ngModel']);
                var min = scope.$eval(attributes['bootstrapSliderMin']);
                var max = scope.$eval(attributes['bootstrapSliderMax']);
                $(element[0]).slider({
                    value: init,
                    min: min,
                    max: max,
                    tooltip: 'hide'
                });

                // Update view to reflect model
                scope.$watch(attributes['ngModel'], function (v) {
                    $(element[0]).slider('setValue', v);
                });

                // Update model to reflect view
                $(element[0]).slider().on('slide', function (ev) {
                    scope.$apply(function () {
                        scope[attributes['ngModel']] = ev.value;
                    });
                });
            });
        };
    };

    bootstrapSliderDirective['$inject'] = injectParams;

    app.directive('bootstrapSlider', bootstrapSliderDirective);
});
//# sourceMappingURL=bootstrapSlider.js.map
