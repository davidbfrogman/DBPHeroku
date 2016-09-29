'use strict';
var BaseAPIController = require('../controllers/Base/BaseAPIController.js');

class PortfolioCategoryController extends BaseAPIController {
    constructor(){
        //Here we're going to have a PortfolioItem with the primary key being the portfolioItemID
        super(require('../models/portfolioCategorySchema.js'),'Id');
    }
}

module.exports = PortfolioCategoryController;