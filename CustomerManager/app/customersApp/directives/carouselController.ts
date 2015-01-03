class CarouselController {

    public images: Array<string>;
    public image: string;
    public index: number;

    private $inject: Array<string> = ['$timeout'];

    constructor(
        private $timeout: ng.ITimeoutService) {

        this.images = [];
        this.image = '';
        this.index = 0;

        this.init();
    }

    setImages = (images: Array<string>): void => {
        this.images = images;
        this.image = images[0];
        this.index = 0;
    };

    nextImage = (): void => {
        this.index = (this.index + 1) % this.images.length;
        this.image = this.images[this.index];
    };

    prevImage = (): void => {
        this.index = (this.index - 1 >= 0 ? this.index - 1 : this.images.length - 1);
        this.image = this.images[this.index];
    };

    nextImageTimeout = (): void => {
        this.nextImage();
        this.$timeout(this.nextImageTimeout, 5 * 1000);
    };

    init = (): void => {
        this.$timeout(this.nextImageTimeout, 5 * 1000);
    }
}

//define(['app'], function (app) {

//    app.register.controller('CarouselController', CarouselController);

//});  

export = CarouselController;     

//tsc 