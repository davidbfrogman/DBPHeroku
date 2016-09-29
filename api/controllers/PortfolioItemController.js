'use strict';
var BaseAPIController = require('../controllers/Base/BaseAPIController.js');

class PortfolioItemController extends BaseAPIController {
    constructor(){
        //Here we're going to have a PortfolioItem with the primary key being the portfolioItemID
        super(require('../models/portfolioItemSchema.js'),'Id');
    }
}

module.exports = PortfolioItemController;