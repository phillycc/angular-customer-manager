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

    var myBackgroundImageDirective: ng.IDirective = function ($q, $parse, dataService) {
        return <ng.IDirective>{
            restrict: 'A', // A - only matches attribute name, E - only matches element name, C - only matches class name            
            link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: any) {
                scope.$watch(attrs['myBackgroundImage'], v => {
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