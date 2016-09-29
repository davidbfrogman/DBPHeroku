'use strict';

var express = require('express');
var PortfolioItemController = require('../../controllers/PortfolioItemController.js');
var PortfolioBookController = require('../../controllers/PortfolioBookController.js');
var PortfolioCategoryController = require('../../controllers/PortfolioCategoryController.js');

class GenericRouter{
    BuildRoutingForAPI(app) {
        app.use('/api/portfolioItem',new PortfolioItemController().route());
        app.use('/api/portfolioBook',new PortfolioBookController().route());
        app.use('/api/portfolioCategory',new PortfolioCategoryController().route());
    }
};

module.exports = GenericRouter;