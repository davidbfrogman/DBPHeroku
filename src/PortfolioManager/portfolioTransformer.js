import {inject} from 'aurelia-framework';
import {dbpMongoAPIService} from '../service/dbpMongoAPIService';
import {PortfolioManagerService} from '../service/dbpSQLPortfolioService';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {dbpConfig} from 'dbpConfig';

@inject(dbpConfig,PortfolioManagerService,dbpMongoAPIService )
export class portfolioTransformer {
    portfolioBooks = [];
    singleCategory = {};
    singleOrder;
    WebAPIPortfolioCount = 0;

    constructor(dbpConfig,PortfolioManagerService, dbpMongoAPIService) {
        this.PortfolioManagerService = PortfolioManagerService;
        this.dbpConfig = dbpConfig;
        this.dbpMongoAPIService = dbpMongoAPIService;
    };

    activate() {
        console.log('Heres the base url were working with: '  + this.dbpMongoAPIService.baseUrl);
    }

    attached() {
    }

    getPortfolioBooksToTransform(){
        return this.getPortfolioBooks()
            .then(portfolioBooks => {this.portfolioBooks = portfolioBooks;})
            .then(() => {
                    //We need to clear out the id's because when we save them to mongo we don't want those there.
                    for(var i = 0; i< this.portfolioBooks.length; i++)
                    {
                        //Ok we're moving the class and the categories
                        //into the category array.  This will generate all our port books with the proper categories.
                        var categories = [this.portfolioBooks[i].category];
                        if(this.portfolioBooks[i].class){ categories.push(this.portfolioBooks[i].class)};

                        this.portfolioBooks[i].categories = categories;

                        delete this.portfolioBooks[i].category;
                        delete this.portfolioBooks[i].id;

                        for(var j = 0; j < this.portfolioBooks[i].items.length; j++){
                            delete this.portfolioBooks[i].items[j].id;
                        }
                    }
                });
    }

    sendPortfolioBooksToMongo(){
        var spnSaveStatus = $('#spnSaveStatus');
        spnSaveStatus.show();
        spnSaveStatus.html('Saving....');
        this.dbpMongoAPIService.savePortfolioBooks(this.portfolioBooks)
            .then(books => spnSaveStatus.html('Just saved ' + books.length + ' Port Books to MongoDB'))
            .then(() => this.getPortfolioBooks())
            .then(() => spnSaveStatus.fadeOut(4000));
    }
    
    getPortfolioBooks() {
        return this.PortfolioManagerService.getAll()
            .then(portfolioBooks => {
                this.portfolioBooks = portfolioBooks;
            })
            .then(() => this.WebAPIPortfolioCount = this.portfolioBooks.length)
            .then(() => { return this.portfolioBooks});
    }
}
