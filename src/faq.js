import {inject} from 'aurelia-framework';
import {dbpUtility} from 'dbpUtility';

@inject(dbpUtility)
export class faq {
    constructor( dbpUtility) {
        this.heading = 'FAQ';
        this.dbpUtility = dbpUtility;
    };
    
    attached()
    {
        this.dbpUtility.shrinkHeroModule();
        this.dbpUtility.scrollToTopOfPage();
        this.dbpUtility.showControlsForImageDetail();
        this.dbpUtility.setPageTitle('FAQ', true);
        this.dbpUtility.setPageMetaDescription('Frequently Asked Questions.', true);
        this.dbpUtility.setPageMetaKeywords('Questions, Answers, Frequent', true);
    }
}

