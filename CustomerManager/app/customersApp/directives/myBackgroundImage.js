'use strict';
define(['app'], function (app) {
    var injectParams = ['$q', '$parse', 'dataService'];

    //var myBackgroundImageDirective: Function = () => {
    //    return (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
    //        scope.$watch(attributes['myBackgroundImage'], v => {
    //            element.css({
    //                'background-image': 'url(' + v + ')',
    //                'background-size': 'cover',
    //                'background-repeat': 'no-repeat',
    //                'background-position': 'center center'
    //            });
    //        });
    //    };
    //};
    var myBackgroundImageDirective = function ($q, $parse, dataService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs['myBackgroundImage'], function (v) {
                    element.css({
                        'background-image': 'url(' + v + ')',
                        'background-size': 'cover',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center center'
                    });
                });
            }
        };
    };

    myBackgroundImageDirective['$inject'] = injectParams;

    app.directive('myBackgroundImage', myBackgroundImageDirective);
});
//# sourceMappingURL=myBackgroundImage.js.map
