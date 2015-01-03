/// <reference path="typings/requirejs/require.d.ts" />
require.config({
    baseUrl: 'app',
    urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {
        kendo_ui_core: '/Scripts/kendo/2014.3.1119/kendo.ui.core.min',
        hammer: '/Scripts/hammer.min',
        slider: '/Scripts/bootstrap-slider.min',
        carouselController: 'customersApp/directives/carouselController'
    }
});
require([
    'customersApp/animations/listAnimations',
    'app',
    'customersApp/directives/wcUnique',
    'carouselController',
    'customersApp/directives/carousel',
    'customersApp/services/routeResolver',
    'customersApp/services/config',
    'customersApp/services/customersBreezeService',
    'customersApp/services/authService',
    'customersApp/services/customersService',
    'customersApp/services/dataService',
    'customersApp/services/modalService',
    'customersApp/services/httpInterceptors',
    'customersApp/filters/nameCityStateFilter',
    'customersApp/filters/nameProductFilter',
    'customersApp/controllers/navbarController',
    'customersApp/controllers/orders/orderChildController'
], function () {
    angular.bootstrap(document, ['customersApp']);
});
//# sourceMappingURL=main.js.map