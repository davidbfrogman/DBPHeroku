import {inject} from 'aurelia-framework';
import {dbpUtility} from 'dbpUtility';

@inject(dbpUtility)
export class pagenotfound {
    constructor( dbpUtility) {
        this.heading = '404';
        this.dbpUtility = dbpUtility;
    };
    
    attached()
    {
        this.dbpUtility.shrinkHeroModule();
        this.dbpUtility.scrollToTopOfPage();
        this.dbpUtility.hideControlsForImageDetail();
        this.dbpUtility.setPageTitle('404', true);
        this.dbpUtility.setPageMetaDescription('404', true);
        this.dbpUtility.setPageMetaKeywords('404', true);
    }
}

