/// <reference path="customersapp/directives/carouselcontroller.ts" />
'use strict';
define(['customersApp/services/routeResolver', 'kendo_ui_core'], function () {
    var app = angular.module('customersApp', [
        'ngRoute', 'ngAnimate', 'routeResolverServices',
        'wc.directives', 'wc.animations', 'ui.bootstrap', 'breeze.angular', 'kendo.directives']);

    app.config([
        '$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider.when('/customers', route.resolve('Customers', 'customers/', 'vm')).when('/customerorders/:customerId', route.resolve('CustomerOrders', 'customers/', 'vm')).when('/customeredit/:customerId', route.resolve('CustomerEdit', 'customers/', 'vm', true)).when('/orders', route.resolve('Orders', 'orders/', 'vm')).when('/about', route.resolve('About', '', 'vm')).when('/login/:redirect*?', route.resolve('Login', '', 'vm')).when('/kendo', route.resolve('Kendo', 'kendo/', 'vm')).when('/directives', route.resolve('DirectivesPlayground', 'directivesPlayground/', 'vm')).otherwise({ redirectTo: '/customers' });
        }]);

    app.controller("CarouselController", CarouselController);

    app.run([
        '$rootScope', '$location', 'authService',
        function ($rootScope, $location, authService) {
            //Client-side security. Server-side framework MUST add it's
            //own security as well since client-based security is easily hacked
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {
                            authService.redirectToLogin();
                        });
                    }
                }
            });
        }]);

    return app;
});
//# sourceMappingURL=app.js.map
