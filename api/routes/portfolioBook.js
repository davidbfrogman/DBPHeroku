var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var portfolioItem = require('../models/portfolioItemSchema.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  portfolioItem.find(function (err, items) {
    if (err) return next(err);
    res.json(items);
    console.log('Getting a list of all portfolio items.');
  });
});

router.post('/', function(req, res, next) {
  portfolioItem.create(req.body, function (err, item) {
    if (err) return next(err);
    console.log('Creating a new portfolio item.');
    res.json(item);
  });
});

router.get('/:id', function(req, res, next) {
  portfolioItem.findById(req.params.id, function (err, item) {
    if (err) return next(err);
    console.log('Getting a specific portfolio item id:' + req.params.id);
    res.json(item);
  });
});

router.put('/:id', function(req, res, next) {
  portfolioItem.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    console.log('Updating a specific portfolio item id:' + req.params.id);    
    res.json(item);
  });
});

router.delete('/:id', function(req, res, next) {
  portfolioItem.findByIdAndRemove(req.params.id, req.body, function (err, item) {
    if (err) return next(err);
    console.log('Deleting a specific portfolio item id:' + req.params.id); 
    res.json(item);
  });
});

module.exports = router;