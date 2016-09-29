'use strict';

var express = require('express');
var router = express.Router();
var self;

class BaseAPIController {

    /**
    @param model Mongoose model
    @param key primary key of the model that will be used for searching, removing
    and reading
  */
  constructor(model, key){
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
    self = this;
  }

  route(){
    router.get('/', function(req, res, next) {
      
      self.model.find(function (err, items) {
        if (err) return next(err);
        res.json(items);
        console.log('Getting a list of all ' + self.model.modelName + 's.');
      });
    });

    router.post('/', function(req, res, next) {
      self.model.create(req.body, function (err, item) {
        if (err) return next(err);
        console.log('Creating a new ' + self.model.modelName);
        res.json(item);
      });
    });

    router.get('/:id', function(req, res, next) {
      self.model.findById(req.params.id, function (err, item) {
        if (err) return next(err);
        console.log('Getting a specific: ' + self.model.modelName + ' By ID: ' + req.params.id);
        res.json(item);
      });
    });

    router.put('/:id', function(req, res, next) {
      self.model.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
        if (err) return next(err);
        console.log('Updating a specific: ' + self.model.modelName + ' By ID: ' + req.params.id);
        res.json(item);
      });
    });

    router.delete('/:id', function(req, res, next) {
      self.model.findByIdAndRemove(req.params.id, req.body, function (err, item) {
        if (err) return next(err);
        console.log('Deleting a specific: ' + self.model.modelName + ' By ID: ' + req.params.id);
        res.json(item);
      });
    });

    return router;
  }
}

module.exports = BaseAPIController;