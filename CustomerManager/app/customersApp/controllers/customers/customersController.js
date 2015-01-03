/// <reference path="../../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../scripts/typings/requirejs/require.d.ts" />
/// <amd-dependency path="app" />
'use strict';
//enum DisplayModeEnum {
//    Card = 0,
//    List = 1
//}
var CustomersController = (function () {
    function CustomersController($location, $filter, $window, $timeout, authService, dataService, modalService) {
        var _this = this;
        this.$location = $location;
        this.$filter = $filter;
        this.$window = $window;
        this.$timeout = $timeout;
        this.authService = authService;
        this.dataService = dataService;
        this.modalService = modalService;
        this.$inject = ['$location', '$filter', '$window', '$timeout', 'authService', 'dataService', 'modalService'];
        this.DisplayModeEnum = {
            Card: 0,
            List: 1
        };
        this.init = function () {
            //createWatches();
            _this.getCustomersSummary();
        };
        this.pageChanged = function (page) {
            _this.currentPage = page;
            _this.getCustomersSummary();
        };
        this.filterCustomers = function (filterText) {
            _this.filteredCustomers = _this.$filter("nameCityStateFilter")(_this.customers, filterText);
            _this.filteredCount = _this.filteredCustomers.length;
        };
        this.getCustomersSummary = function () {
            _this.dataService.getCustomersSummary(_this.currentPage - 1, _this.pageSize).then(function (data) {
                _this.totalRecords = data.totalRecords;
                _this.customers = data.results;
                _this.filterCustomers(''); //Trigger initial filter
                _this.$timeout(function () {
                    _this.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
                }, 1000);
            }, function (error) {
                _this.$window.alert('Sorry, an error occurred: ' + error.data.message);
            });
        };
        this.getCustomerById = function (id) {
            for (var i = 0; i < _this.customers.length; i++) {
                var cust = _this.customers[i];
                if (cust.id === id) {
                    return cust;
                }
            }
            return null;
        };
        this.deleteCustomer = function (id) {
            if (!_this.authService.user.isAuthenticated) {
                _this.$location.path(_this.authService.loginPath + _this.$location.$$path); //TODO debug any walkaround
                return;
            }
            var cust = _this.getCustomerById(id);
            var custName = cust.firstName + ' ' + cust.lastName;
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Customer',
                headerText: 'Delete ' + custName + '?',
                bodyText: 'Are you sure you want to delete this customer?'
            };
            _this.modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    _this.dataService.deleteCustomer(id).then(function () {
                        for (var i = 0; i < _this.customers.length; i++) {
                            if (_this.customers[i].id === id) {
                                _this.customers.splice(i, 1);
                                break;
                            }
                        }
                        _this.filterCustomers(_this.searchText);
                    }, function (error) {
                        _this.$window.alert('Error deleting customer: ' + error.message);
                    });
                }
            });
        };
        this.changeDisplayMode = function (displayMode) {
            switch (displayMode) {
                case _this.DisplayModeEnum.Card:
                    _this.listDisplayModeEnabled = false;
                    break;
                case _this.DisplayModeEnum.List:
                    _this.listDisplayModeEnabled = true;
                    break;
            }
        };
        this.navigate = function (url) {
            _this.$location.path(url);
        };
        this.setOrder = function (orderby) {
            if (orderby === _this.orderby) {
                _this.reverse = !_this.reverse;
            }
            _this.orderby = orderby;
        };
        this.searchTextChanged = function () {
            _this.filterCustomers(_this.searchText);
        };
        //this = $scope
        this.customers = [];
        this.filteredCustomers = [];
        this.filteredCount = 0;
        this.orderby = 'lastName';
        this.reverse = false;
        this.searchText = null;
        this.cardAnimationClass = '.card-animation';
        this.listDisplayModeEnabled = false;
        //paging
        this.totalRecords = 0;
        this.pageSize = 10;
        this.currentPage = 1;
        this.init();
    }
    return CustomersController;
})();
//declare var app: any;
//app.register.controller('CustomersController', CustomersController); //app is indefined here
//export = CustomersController;
//import app = require("../../../app2"); //for TS app2 module is defined in wrong way ..
define(['app'], function (app) {
    app.register.controller('CustomersController', CustomersController);
});
//# sourceMappingURL=customersController.js.map