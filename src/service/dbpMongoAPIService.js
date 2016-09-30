import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {dbpConfig} from 'dbpConfig';

@inject(dbpConfig)
export class dbpMongoAPIService {
    portfolioBooks = [];
    portfolioCategories = [];
    portfolioItems = [];

    constructor(dbpConfig) {
        this.dbpConfig = dbpConfig;
        
        //These services should be responsible for newing up their own http client.
        //when there are multiple http client's laying around the base urls get overwritten.
        // that's why this isn't injected here. 
        this.http = new HttpClient();
        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.dbpConfig.dbpMongoApiBaseUrl);
        });
    }

    getById(id) {
        return this.http.fetch(`portfolioBook/${id}`)
            .then(response => {
                return response.json();
            });
    }

    getAll() {
        
        return this.http.fetch('portfolioBook')
            .then(response => response.json())
            .then(portfolioBooks => this.portfolioBooks = portfolioBooks)
    }

    getPortfolioCategories() {
        return this.http.fetch('portfolioCategory')
            .then(response => response.json())
            .then(portfolioCategories => this.portfolioCategories = portfolioCategories)
    }

    getPortfolioBooksForDisplay() {
        return this.http.fetch('GetCachedPortfolioBooks')
            .then(response => response.json())
            .then(portfolioBooks => this.portfolioBooks = portfolioBooks)
    }

    save(portfolioBook) {
        console.log(portfolioBook);
        console.log('That was our port book were trying to save');
        if (portfolioBook.id) {
            return this.http.fetch(`portfolioBook/${portfolioBook.id}`, {
                method: 'put',
                body: JSON.stringify(portfolioBook),
                headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
                .then(
                response => { return response.json() }
                );
        }
        else {
            return this.http.fetch(`portfolioBook`, {
                method: 'post',
                body: JSON.stringify(portfolioBook),
                headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
                .then(
                response => { return response.json() }
                );
        };
    }

    savePortfolioBooks(portfolioBooks) {
        var self = this;
        self.portfolioBooks = portfolioBooks;
        var savePromises = [];
        for (var index = 0; index < self.portfolioBooks.length && index < 2; index++) {
            var portfolioBook = self.portfolioBooks[index];
            savePromises.push(self.save(portfolioBook));
        }
        return Promise.all(savePromises);
    }

    deletePortfolioBook(portfolioBook) {
        console.log('Were about to delete the following port book');
        console.log(portfolioBook);
        if (portfolioBook.id) {
            return this.http.fetch(`portfolioBook/${portfolioBook.id}`, {
                method: 'delete',
                body: JSON.stringify(portfolioBook),
                headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
                .then(response => {
                    return response.content;
                });
        }
    }

    deletePortfolioItem(portfolioItem) {
        console.log('Were about to delete the following port item');
        console.log(portfolioItem);
        //If we're deleting one we need to make sure it's id isn't undefined, and it's not 0 because we just added it before we saved it.
        if (portfolioItem.id) {
            return this.http.fetch(`portfolioItem/${portfolioItem.id}`, {
                method: 'delete',
                body: JSON.stringify(portfolioItem),
                headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
                .then(response => {
                    return response.content;
                });
        }
    }

    addPortfolioItem(portfolioItem) {
        return this.http.fetch(`portfolioItem`, {
            method: 'post',
            body: JSON.stringify(portfolioItem),
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
            .then(
            response => { return response.json() }
            );
    }
}


