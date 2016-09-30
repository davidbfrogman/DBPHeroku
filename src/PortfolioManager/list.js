import {inject} from 'aurelia-framework';
import {PortfolioManagerService} from '../service/dbpSQLPortfolioService';
import {Router} from 'aurelia-router';

@inject(PortfolioManagerService, Router)
export class List {
    portfolioBooks = [];
    singleCategory = {};
    singleOrder;
    scrollPosition;

    constructor(PortfolioManagerService, router) {
        this.service = PortfolioManagerService;
        this.router = router;
    };

    activate() {
        return this.getData();
    }

    attached() {
        if (this.scrollPosition) {
            $('html, body').animate({
                scrollTop: this.scrollPosition
            }, 200);
        }
    }

    navigateToEdit(portfolioBook) {
        this.router.navigateToRoute('edit', { id: portfolioBook.id })
        this.scrollPosition = $(window).scrollTop();
    };

    navigateToCreateNew() {
        this.router.navigateToRoute('create');
        this.scrollPosition = $(window).scrollTop();
    };
    
    navigateToTransformer() {
        this.router.navigateToRoute('portfolioTransformer');
        this.scrollPosition = $(window).scrollTop();
    };

    getData() {
        return this.service.getAll()
            .then(portfolioBooks => {
                this.portfolioBooks = portfolioBooks;
            });
    }

    sort(column) {
        switch (column) {
            case 'id':
                this.portfolioBooks.sort(function (a, b) {
                    return parseInt(a.id) - parseInt(b.id);
                });
                break;
            case 'order':
                this.portfolioBooks.sort(function (a, b) {
                    return parseInt(a.order) - parseInt(b.order);
                });
                break;
            case 'category':
                this.portfolioBooks.sort(function (a, b) {
                    return a.category.localeCompare(b.category);
                });
                break;
            case 'isActive':
                this.portfolioBooks.sort(function (a, b) {
                    return (a.isActive === b.isActive) ? 0 : a.isActive ? -1 : 1;
                });
                break;
            case 'isSingle':
                this.portfolioBooks.sort(function (a, b) {
                    return (a.isSingle === b.isSingle) ? 0 : a.isSingle ? -1 : 1;
                });
                break;
            default:
                break;
        }
    }

    updatePortfolioBook(portfolioBook) {
        this.service.save(portfolioBook).then(() => this.getData());
    }

    deletePortfolioBook(portfolioBook) {
        this.service.deletePortfolioBook(portfolioBook).then(x => this.getData());
    }

    AddSinglePortfolioBooks() {
        var inputPortfolioFiles = $('#inptSingles')[0].files;
        for (var i = 0; i < inputPortfolioFiles.length; i++) {
            var portfolioBook = {
                "category": this.singleCategory,
                "isSingle": true,
                "isActive": true,
                "order": this.singleOrder,
                "imageThumbnailURL": inputPortfolioFiles[i].name,
                "items": [{
                    "imageURL": inputPortfolioFiles[i].name,
                    "order": 1
                }]
            }

            this.service.save(portfolioBook).then(() => this.getData());
        };
        return;
    }

    SaveBooks() {
        var spnSaveStatus = $('#spnSaveStatus');
        spnSaveStatus.show();
        spnSaveStatus.html('Saving....');
        this.service.savePortfolioBooks(this.portfolioBooks)
            .then(response => spnSaveStatus.html('Just saved ' + response.length + ' Port Books'))
            .then(() => this.getData())
            .then(() => spnSaveStatus.fadeOut(4000));

    }

}
