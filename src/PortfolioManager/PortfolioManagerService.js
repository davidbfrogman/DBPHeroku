import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {dbpConfig} from 'dbpConfig';

// ctrl-/ to comment a selection in atom.

@inject(HttpClient, dbpConfig)
export class PortfolioManagerService {
    portfolioBooks = [];
    portfolioCategories = [];

    constructor(http, dbpConfig) {
        this.http = http;
        this.dbpConfig = dbpConfig;

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.dbpConfig.dbpApiBaseUrl);
        });
    }

    getById(id) {
        return this.http.fetch(`portfolioBooks/${id}`)
            .then(response => {
                return response.json();
            });
    }

    getAll() {
        return this.http.fetch('portfolioBooks')
            .then(response => response.json())
            .then(portfolioBooks => this.portfolioBooks = portfolioBooks)
    }

    getGetPortfolioCategories() {
        return this.http.fetch('GetCachedPortfolioCategories')
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
            return this.http.fetch(`portfolioBooks/${portfolioBook.id}`, {
                method: 'put',
                body: JSON.stringify(portfolioBook),
                headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
                .then(
                response => { return response.json() }
                );
        }
        else {
            return this.http.fetch(`portfolioBooks`, {
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
        for (var index = 0; index < self.portfolioBooks.length; index++) {
            var portfolioBook = self.portfolioBooks[index];
            savePromises.push(self.save(portfolioBook));
        }
        return Promise.all(savePromises);
    }

    deletePortfolioBook(portfolioBook) {
        console.log('Were about to delete the following port book');
        console.log(portfolioBook);
        if (portfolioBook.id) {
            return this.http.fetch(`portfolioBooks/${portfolioBook.id}`, {
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
            return this.http.fetch(`portfolioItems/${portfolioItem.id}`, {
                method: 'delete',
                body: JSON.stringify(portfolioItem),
                headers: { "Accept": "application/json", "Content-Type": "application/json" }
            })
                .then(response => {
                    return response.content;
                });
        }
    }

    addNewPortfolioItem(portfolioItem) {
        return this.http.fetch(`portfolioItems`, {
            method: 'post',
            body: JSON.stringify(portfolioItem),
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
            .then(
            response => { return response.json() }
            );
    }
}


