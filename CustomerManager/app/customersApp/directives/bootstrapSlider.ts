'use strict';

define(['app', 'slider'], function (app, slider) {

    var injectParams = ['$q', '$parse', 'dataService'];

    var bootstrapSliderDirective: Function = () => {
        return (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
            $(document).ready(function () {
                var init = scope.$eval(attributes['ngModel']);
                var min = scope.$eval(attributes['bootstrapSliderMin']);
                var max = scope.$eval(attributes['bootstrapSliderMax']);
                (<any>$(element[0])).slider({
                    value: init,
                    min: min,
                    max: max,
                    tooltip: 'hide'
                });

                // Update view to reflect model
                scope.$watch(attributes['ngModel'], function (v) {
                    (<any>$(element[0])).slider('setValue', v);
                });

                // Update model to reflect view
                (<any>$(element[0])).slider().on('slide', function (ev) {
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