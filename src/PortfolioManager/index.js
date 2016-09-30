import {inject} from 'aurelia-framework';
import {dbpheader} from 'controls/dbpheader';

@inject(dbpheader)
export class Index {
    constructor(dbpheader) {
        this.dbpheader = dbpheader;
    }

    attached() {
        this.dbpheader.shrinkHeroModule(350, 175);
        $('html, body').animate({
            scrollTop: 0
        }, 100);
    }

    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit' },
            { route: 'create', moduleId: './edit', name: 'create' },
            { route: 'portfolioTransformer', moduleId: './portfolioTransformer', name: 'portfolioTransformer' }
        ]);

        this.router = router;
    }

}



