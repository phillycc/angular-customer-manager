/// <reference path="../../../scripts/typings/hammerjs-1.1.3.d.ts" />

'use strict';

define(['app', 'hammer'], function (app, Hammer) {

    var injectParams = ['$q', '$parse', 'dataService'];

    var swipeLeftDirective: Function = () => {
        return (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
            $(document).ready(function () {
                Hammer(element).on('swipeleft', function () {
                    scope.$eval(attributes['swipeLeft']);
                    scope.$apply();
                });
            });
        };
    };

    swipeLeftDirective['$inject'] = injectParams;

    app.directive('swipeLeft', swipeLeftDirective);

}); 