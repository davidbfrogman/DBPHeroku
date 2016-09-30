import {inject} from 'aurelia-framework';
import {PortfolioManagerService} from '../service/dbpSQLPortfolioService';
import {Router} from 'aurelia-router';

@inject(PortfolioManagerService, Router)
export class Edit {
    saveOnExit = true;
    portfolioBook = {};
    portfolioBookId = {};
    //this property is used in the table so we can bind to it.  
    portfolioBookItems = [];

    constructor(PortfolioManagerService, router) {
        this.service = PortfolioManagerService;
        this.router = router;
    }

    cancel() {
        this.loadPortfolioBook(this.portfolioBook.id);
        this.saveOnExit = false;
        window.history.back();
    }

    goBack() {
        this.save(true);
        window.history.back();
    }

    detached() {
        if (this.saveOnExit) {
            this.save(true);
        }
    } 

    activate(params) {
        $('html, body').animate({
            scrollTop: 300
        }, 100);
        
        if (params.id) {
            return this.loadPortfolioBook(params.id);
        }
    }

    loadPortfolioBook(id) {
        return this.service.getById(id)
            .then(portfolioBook => {
                this.updatePortfolioBookVaribles(portfolioBook);
            })
            .then(portfolioBook => {
                console.log('Heres the book were editing');
                console.log(portfolioBook);
            });
    };

    save(navigateBackToList) {
        this.service.save(this.portfolioBook)
            .then(portfolioBook => {
                this.portfolioBook = portfolioBook;
                if(navigateBackToList){ this.router.navigate("list"); }
            });
    };
        
    setAsCover(portfolioItem){
        this.portfolioBook.imageThumbnailURL = portfolioItem.imageURL;
        this.save(false);
    }

    addFiles() {
        this.service.save(this.portfolioBook)
            .then(portfolioBook => {
                this.originalJsonString = JSON.stringify(portfolioBook);
                this.portfolioBook = portfolioBook;
                var inputPortfolioFiles = $('#inptPortfolioFiles')[0].files;
                for (var i = 0; i < inputPortfolioFiles.length; i++) {
                    this.addEmptyPortfolioItem(this.portfolioBook, inputPortfolioFiles[i].name, i + 1);
                };
            });
        return;
    }

    addEmptyPortfolioItem(portfolioBook, imageUrl, order) {
        this.service.addNewPortfolioItem({ "portfolioBookId": portfolioBook.id, "imageURL": imageUrl, "order": order }).then(response => {
            this.portfolioBook.items.push(response);
            this.updatePortfolioBookVaribles(this.portfolioBook);
        });
    }

    deletePortfolioItem(portfolioItem) {
        //Just find it in the array and remove it.
        if (portfolioItem.id) {
            this.service.deletePortfolioItem(portfolioItem);
            for (var i = 0; i < this.portfolioBook.items.length; i++) {
                if (this.portfolioBook.items[i].id == portfolioItem.id) {
                    this.portfolioBook.items.splice(i, 1);
                    break;
                }
            }
        }
    }

    updatePortfolioBookVaribles(portfolioBook) {
        //We're storing off what the original json string was.  This will help us when we
        //compare it to see if anything has changed.
        this.portfolioBookItems = portfolioBook.items;
        this.portfolioBook = portfolioBook;
        return portfolioBook;
    }
}
