/// <reference path="../../../scripts/typings/hammerjs-1.1.3.d.ts" />
'use strict';
define(['app', 'hammer'], function (app, Hammer) {
    var injectParams = ['$q', '$parse', 'dataService'];

    var swipeRightDirective = function () {
        return function (scope, element, attributes) {
            $(document).ready(function () {
                Hammer(element).on('swipeRight', function () {
                    scope.$eval(attributes['swipeRight']);
                    scope.$apply();
                });
            });
        };
    };

    swipeRightDirective['$inject'] = injectParams;

    app.directive('swipeRight', swipeRightDirective);
});
//# sourceMappingURL=swipeRight.js.map
