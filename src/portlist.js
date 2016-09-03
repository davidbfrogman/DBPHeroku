import {inject} from 'aurelia-framework';
import {dbpUtility} from 'dbpUtility';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';
import {PortfolioManagerService} from './PortfolioManager/PortfolioManagerService';

@inject(dbpUtility, HttpClient, Router,PortfolioManagerService)
export class portlist {
    portfolioBooks = [];

    constructor(dbpUtility, HttpClient, Router, PortfolioManagerService) {
        this.heading = 'Portfolio List';
        this.dbpUtility = dbpUtility;
        this.HttpClient = HttpClient;
        this.Router = Router;
        this.service = PortfolioManagerService;
    };

    activate() {
        return this.service.getPortfolioBooksForDisplay()
            .then(portfolioBooks => {
                this.portfolioBooks = portfolioBooks;
                var i = 0;

                for (var book of this.portfolioBooks) {
                    //Now we need to remove the space from the string because later we're going to filter on it.
                    //For instance the editorial portrait category is something we want to filter on.
                    //if(i >2){ delete this.portfolioBooks[i]; }
                    book.prettyUrl = encodeURI('/pd/' + book.title + '-' + book.subtitle + '-Prague' + '-' + book.category + '-' + 'photographer' + '/' + book.id)
                        .replace(/%20/g, '-')
                        .replace('.', '')
                        .replace('-null','');
                        
                    book.prettyTitle = encodeURI(book.title + '-' + book.subtitle + '-Prague' + '-' + book.category + '-' + 'photographer')
                        .replace(/%20/g, '-')
                        .replace('.', '')
                        .replace('-null','');
                        
                    i++;
                    book.category = book.category.replace(/\s+/g, '');
                    book.items.sort(function(a, b) {
                        return parseInt(a.order) - parseInt(b.order);
                    })
                }
            });
    }
    
    attached()
    {
        this.dbpUtility.shrinkHeroModule();
        this.dbpUtility.scrollToTopOfPage();
        this.dbpUtility.showControlsForImageDetail();
        this.dbpUtility.setPageTitle('Portfolio List', true);
        this.dbpUtility.setPageMetaDescription('Listing of Books', true);
        this.dbpUtility.setPageMetaKeywords('Módní fotograf, Fashion, Advertising, Headshots, Professional Photographer', true);
    }
}

