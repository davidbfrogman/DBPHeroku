'use strict';
var BaseAPIController = require('../controllers/Base/BaseAPIController.js');

class PortfolioBookController extends BaseAPIController {
    constructor(){
        //Here we're going to have a PortfolioItem with the primary key being the portfolioItemID
        super(require('../models/portfolioBookSchema.js'),'Id');
    }
}

module.exports = PortfolioBookController;