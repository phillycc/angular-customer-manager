/// <reference path="../../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../scripts/typings/requirejs/require.d.ts" />
/// <amd-dependency path="app" />

'use strict';

//enum DisplayModeEnum {
//    Card = 0,
//    List = 1
//}

class CustomersController {

    public customers: Array<any>;
    public filteredCustomers: Array<any>;
    public filteredCount: number;
    public orderby: string;
    public reverse: boolean;
    public searchText: string;
    public cardAnimationClass: string;
    public listDisplayModeEnabled: boolean;

    //paging
    public totalRecords: number;
    public pageSize: number;
    public currentPage: number;

    private $inject: Array<string> = ['$location', '$filter', '$window',
        '$timeout', 'authService', 'dataService', 'modalService'];

    DisplayModeEnum = {
        Card: 0,
        List: 1
    }

    constructor(
        private $location: ng.ILocationService,
        private $filter: ng.IFilterService,
        private $window: Window,
        private $timeout: ng.ITimeoutService,
        private authService,
        private dataService,
        private modalService) {

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

    init = (): void => {
        //createWatches();
        this.getCustomersSummary();
    }

    pageChanged = (page: number): void => {
        this.currentPage = page;
        this.getCustomersSummary();
    }

    filterCustomers = (filterText: string) => {
        this.filteredCustomers = this.$filter("nameCityStateFilter")(this.customers, filterText);
        this.filteredCount = this.filteredCustomers.length;
    }

    getCustomersSummary = (): void => {
        this.dataService.getCustomersSummary(this.currentPage - 1, this.pageSize)
            .then(data => {
                this.totalRecords = data.totalRecords;
                this.customers = data.results;
                this.filterCustomers(''); //Trigger initial filter

                this.$timeout(() => {
                    this.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
                }, 1000);

            }, error => {
                this.$window.alert('Sorry, an error occurred: ' + error.data.message);
            });
    }

    getCustomerById = (id: number): any => {
        for (var i = 0; i < this.customers.length; i++) {
            var cust = this.customers[i];
            if (cust.id === id) {
                return cust;
            }
        }
        return null;
    }

    deleteCustomer = (id: number) => {
        if (!this.authService.user.isAuthenticated) {
            this.$location.path(this.authService.loginPath + (<any>this.$location).$$path); //TODO debug any walkaround
            return;
        }

        var cust = this.getCustomerById(id);
        var custName = cust.firstName + ' ' + cust.lastName;

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete Customer',
            headerText: 'Delete ' + custName + '?',
            bodyText: 'Are you sure you want to delete this customer?'
        };

        this.modalService.showModal({}, modalOptions).then(result => {
            if (result === 'ok') {
                this.dataService.deleteCustomer(id).then(() => {
                    for (var i = 0; i < this.customers.length; i++) {
                        if (this.customers[i].id === id) {
                            this.customers.splice(i, 1);
                            break;
                        }
                    }
                    this.filterCustomers(this.searchText);
                }, error => {
                        this.$window.alert('Error deleting customer: ' + error.message);
                    });
            }
        });
    };

    changeDisplayMode = (displayMode: number): void => {
        switch (displayMode) {
            case this.DisplayModeEnum.Card:
                this.listDisplayModeEnabled = false;
                break;
            case this.DisplayModeEnum.List:
                this.listDisplayModeEnabled = true;
                break;
        }
    };

    navigate = (url: string): void => {
        this.$location.path(url);
    };

    setOrder = (orderby: string): void => {
        if (orderby === this.orderby) {
            this.reverse = !this.reverse;
        }
        this.orderby = orderby;
    };

    searchTextChanged = (): void => {
        this.filterCustomers(this.searchText);
    };

}

//declare var app: any;
//app.register.controller('CustomersController', CustomersController); //app is indefined here

//export = CustomersController;

//import app = require("../../../app2"); //for TS app2 module is defined in wrong way ..

define(['app'], function (app) {

    app.register.controller('CustomersController', CustomersController);

}); 