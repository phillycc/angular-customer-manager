//http://thecodebarbarian.wordpress.com/2013/09/23/the-8020-guide-to-writing-angularjs-directives/

'use strict';

define(['app', 'customersApp/directives/bootstrapSlider', 'customersApp/directives/myBackgroundImage', 'customersApp/directives/swipeLeft', 'customersApp/directives/swipeRight'], function (app) {

    var injectParams = ['$q', '$parse', 'dataService'];

    var carouselDirective: ng.IDirective = function ($q, $parse, dataService) {
        return <ng.IDirective>{
            restrict: 'E', // A - only matches attribute name, E - only matches element name, C - only matches class name
            require: 'ngImages',
            scope: {
                images: '=ngImages'
            },
            controller: 'CarouselController',
            controllerAs: 'vm',
            template: "<div my-background-image='vm.images[vm.index]' class='tall' swipe-left='vm.nextImage()'></div>" +
                "<div ng-click='vm.prevImage()' class='pointer'>Prev</div>" +
                "<div ng-click='vm.nextImage()' class='pointer'>Next</div>" +
                "<div id='mySlider'>" +
                " <div bootstrap-slider='true' ng-model='vm.index' bootstrap-slider-min='0' bootstrap-slider-max='vm.images.length - 1'></div>" +
                "</div>",
            link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: any) {                
            }
        };
    };    

    carouselDirective['$inject'] = injectParams;

    app.directive('carousel', carouselDirective);

});