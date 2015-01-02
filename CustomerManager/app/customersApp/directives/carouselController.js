'use strict';
var CarouselController = (function () {
    function CarouselController($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.$inject = ['$timeout'];
        this.setImages = function (images) {
            _this.images = images;
            _this.image = images[0];
            _this.index = 0;
        };
        this.nextImage = function () {
            _this.index = (_this.index + 1) % _this.images.length;
            _this.image = _this.images[_this.index];
        };
        this.prevImage = function () {
            _this.index = (_this.index - 1 >= 0 ? _this.index - 1 : _this.images.length - 1);
            _this.image = _this.images[_this.index];
        };
        this.nextImageTimeout = function () {
            _this.nextImage();
            _this.$timeout(_this.nextImageTimeout, 5 * 1000);
        };
        this.init = function () {
            _this.$timeout(_this.nextImageTimeout, 5 * 1000);
        };
        this.images = [];
        this.image = '';
        this.index = 0;

        this.init();
    }
    return CarouselController;
})();

define(['app'], function (app) {
    app.register.controller('CarouselController', CarouselController);
});
//export = CarouselController;
//# sourceMappingURL=carouselController.js.map
