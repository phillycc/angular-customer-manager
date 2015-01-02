/// <reference path="../../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../scripts/kendo/2014.3.1119/typescript/kendo.all.d.ts" />
/// <reference path="../../../../scripts/typings/requirejs/require.d.ts" />

class DirectivesPlaygroundController {

    private $inject: Array<string> = ['$location', '$filter', '$window',
        '$timeout', 'authService', 'dataService', 'modalService'];

    constructor(
        private $location: ng.ILocationService,
        private $filter: ng.IFilterService,
        private $window: Window,
        private $timeout: ng.ITimeoutService,
        private authService,
        private dataService,
        private modalService) {        
    }
}

//declare var app: any;
//app.register.controller('CustomersController', CustomersController); //app is indefined here

//export = CustomersController;

//import app = require("../../../app2"); //for TS app2 module is defined in wrong way ..

define(['app'], function (app) {
    
    app.register.controller('DirectivesPlaygroundController', DirectivesPlaygroundController);

});  