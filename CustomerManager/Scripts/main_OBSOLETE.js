
require.config({
    baseUrl: 'app',
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(
    [
        'customersApp/animations/listAnimations',
        'app',
        'customersApp/directives/wcUnique',
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
        'customersApp/controllers/orders/orderChildController',
        '../Scripts/kendo/2014.3.1119/kendo.ui.core.min',
        '../Scripts/kendo/2014.3.1119/kendo.angular.min'
    ],
    function () {
        angular.bootstrap(document, ['customersApp']);
    });
