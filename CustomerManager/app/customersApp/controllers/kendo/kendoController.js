/// <reference path="../../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../scripts/kendo/2014.3.1119/typescript/kendo.all.d.ts" />
/// <reference path="../../../../scripts/typings/requirejs/require.d.ts" />
/// <amd-dependency path="app" />
'use strict';
var KendoController = (function () {
    function KendoController($location, $filter, $window, $timeout, authService, dataService, modalService) {
        var _this = this;
        this.$location = $location;
        this.$filter = $filter;
        this.$window = $window;
        this.$timeout = $timeout;
        this.authService = authService;
        this.dataService = dataService;
        this.modalService = modalService;
        this.$inject = ['$location', '$filter', '$window', '$timeout', 'authService', 'dataService', 'modalService'];
        this.init = function () {
            //todo
        };
        this.onSubmit = function () {
            var x = _this.firstDate;
        };
        this.firstDate = null;
        this.firstDatePicker = {
            start: 'month',
            depth: 'month',
            format: 'MMMM dd yyyy',
            value: new Date()
        };
        this.init();
    }
    return KendoController;
})();
//declare var app: any;
//app.register.controller('CustomersController', CustomersController); //app is indefined here
//export = CustomersController;
//import app = require("../../../app2"); //for TS app2 module is defined in wrong way ..
define(['app'], function (app) {
    app.register.controller('KendoController', KendoController);
});
//# sourceMappingURL=kendoController.js.map