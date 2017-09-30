import {inject} from 'aurelia-framework';
import {PortfolioManagerService} from './PortfolioManager/PortfolioManagerService';
import {dbpUtility} from 'dbpUtility';


@inject(PortfolioManagerService, dbpUtility)
export class ImageDetail {

    portfolioBook = {};

    constructor(PortfolioManagerService, dbpUtility) {
        this.service = PortfolioManagerService;
        this.dbpUtility = dbpUtility;
    }

    activate(params, routeConfig) {

        return this.service.getById(params.id)
            .then(portfolioBook => {
                this.portfolioBook = portfolioBook;
            })
    }

    attached() {
        //<link rel="canonical" href="https://blog.example.com/dresses/green-dresses-are-awesome" />
        if (window.location.href.indexOf('/pd/') > 0) {
            var link = document.createElement('link');
            link.href = window.location.href;
            link.rel = 'canonical';
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        this.dbpUtility.hideControlsForImageDetail();

        console.log('Port book in image detail: ');
        console.log(this.portfolioBook);


        this.portfolioBook.prettyTitle = encodeURI(this.portfolioBook.title + ' ' + this.portfolioBook.subtitle + ' New York ' + this.portfolioBook.category + ' photographer')
            .replace(/%20/g, ' ')
            .replace('-null', '');

        this.portfolioBook.backTitle = encodeURI(' New York ' + this.portfolioBook.category + ' Photographer')
            .replace(/%20/g, ' ')
            .replace('.', '')
            .replace('-null', '');

        this.portfolioBook.cleanedTitle = encodeURI(this.portfolioBook.title)
            .replace(/%20/g, ' ')
            .replace('.', '');

        this.dbpUtility.setPageTitle(this.portfolioBook.prettyTitle, false);
        this.dbpUtility.setPageMetaDescription(this.portfolioBook.prettyTitle, true);
        this.dbpUtility.setPageMetaKeywords('Portfolio, Detail,' + this.portfolioBook.cleanedTitle, true);
    }
}