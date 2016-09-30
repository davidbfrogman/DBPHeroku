import {inject} from 'aurelia-framework';
import {PortfolioManagerService} from './PortfolioManagerService';
import {Router} from 'aurelia-router';

@inject(PortfolioManagerService, Router)
export class portfolioTransformer {
    portfolioBooks = [];
    singleCategory = {};
    singleOrder;

    constructor(PortfolioManagerService, router) {
        this.service = PortfolioManagerService;
        this.router = router;
    };

    activate() {
        return this.getData();
    }

    attached() {
    }
    
    getData() {
        return this.service.getAll()
            .then(portfolioBooks => {
                this.portfolioBooks = portfolioBooks;
            });
    }
}
