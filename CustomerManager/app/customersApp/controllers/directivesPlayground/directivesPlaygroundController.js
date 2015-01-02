/// <reference path="../../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../scripts/kendo/2014.3.1119/typescript/kendo.all.d.ts" />
/// <reference path="../../../../scripts/typings/requirejs/require.d.ts" />
var DirectivesPlaygroundController = (function () {
    function DirectivesPlaygroundController($location, $filter, $window, $timeout, authService, dataService, modalService) {
        this.$location = $location;
        this.$filter = $filter;
        this.$window = $window;
        this.$timeout = $timeout;
        this.authService = authService;
        this.dataService = dataService;
        this.modalService = modalService;
        this.$inject = [
            '$location', '$filter', '$window',
            '$timeout', 'authService', 'dataService', 'modalService'];
    }
    return DirectivesPlaygroundController;
})();

//declare var app: any;
//app.register.controller('CustomersController', CustomersController); //app is indefined here
//export = CustomersController;
//import app = require("../../../app2"); //for TS app2 module is defined in wrong way ..
define(['app'], function (app) {
    app.register.controller('DirectivesPlaygroundController', DirectivesPlaygroundController);
});
//# sourceMappingURL=directivesPlaygroundController.js.map
