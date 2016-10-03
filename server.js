    'use strict';

    // set up ========================
    var express  = require('express');
    var compression =  require('compression');
    var fallback = require('express-history-api-fallback');
    var root     = __dirname;
    var app      = express();                               // create our app w/ express
    var morgan   = require('morgan');             // log requests to the console (express4)
    var logger   = morgan('combined');
    var favicon  = require('serve-favicon');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var router = express.Router();
    var mers = require('mers');
    var autoIncrement = require('mongoose-auto-increment');

    // models ===========================
    var ModelSchema = require('./api/models/ModelSchema');
    
    //Get the correct config prod/dev
    var currentConfig = require('./serverconfig.js');
    
    //This will be helpful on production when we want to force users to www version of my site.
    app.use( require('express-force-domain')(currentConfig.rootUrl) );
    
    app.use(favicon(__dirname + '/favicon.ico'));

    //Here were telling the server to be able to read things from the body of a post.
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(bodyParser.json());
    
    // log every request to the console except images...
    app.use(
        morgan('dev', {
            skip : function(req,res) { return req.url.indexOf('.jpg') != -1; }
        })
    );

    var connection = mongoose.connect('mongodb://dbuser:asdfkjoaisd8728SAKJHSUse321@ds147975.mlab.com:47975/davebrownportfoliodb');
    autoIncrement.initialize(connection);
    ModelSchema.PortfolioItemSchema.plugin(autoIncrement.plugin, 'PortfolioItem');
    ModelSchema.PortfolioCategorySchema.plugin(autoIncrement.plugin, 'PortfolioBook');
    ModelSchema.PortfolioBookSchema.plugin(autoIncrement.plugin, 'PortfolioCategory');


    //client -------------------------------------------------------------
                                                     
    app.use(require('prerender-node').set('prerenderServiceUrl', currentConfig.prerenderServiceURL));
    
    // compress all requests
    app.use(compression());
    app.use(express.static(root, { dotfiles: 'allow', maxAge: currentConfig.cacheShort} ));
    app.use(express.static(root + '/dist', { dotfiles: 'allow', maxAge: currentConfig.cacheShort, index: false} ));
    app.use(express.static(root + '/images', { dotfiles: 'allow', maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/jspm_packages', { dotfiles: 'allow', maxAge: currentConfig.cacheLong, index: false} ));
    app.use(express.static(root + '/node_modules', { dotfiles: 'allow', maxAge: currentConfig.cacheLong, index: false} ));

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    app.use('/api',mers({mongoose}).rest());

    //Redirects-----------------------------------------------------------------
   
    app.get('*', function(req, res, next) {
        console.log('OriginalUrl for the request: ' + req.originalUrl);
        
        //Mobile Redirection
        if(req.hostname.toLowerCase().indexOf('m.davebrownphotography.com') >= 0 ){ 
                res.status(301);
                console.log('Redirection for Mobile');
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl } });
        }
        else if(req.originalUrl.indexOf('Portfolio/Denver') > 0){
                res.status(301);
                console.log('Redirection for Mobile old portfolios');
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl } });
        }
        //I think these are from my original site.
        else if(req.originalUrl.toLowerCase().indexOf('home/about') >= 0
        || req.originalUrl.toLowerCase().indexOf('home/contact') >= 0
        || req.originalUrl.toLowerCase().indexOf('home/faq') >= 0
        || req.originalUrl.toLowerCase().indexOf('personalportfolio') >= 0
        )
        {
                console.log('Redirection for Random old Links');
                res.redirect(301, currentConfig.rootUrl);
        }
        //Old Site redirection
        else if(req.originalUrl.indexOf('.aspx') > 0)
        {
            console.log('Handling Redirection for ASPX Page');
            console.log('Heres the original URL for matching aspx page: ' + req.originalUrl);
            console.log('Heres the req.hostname: ' + req.hostname);
            res.status(301);
            console.log(req.hostname);

            if(req.originalUrl.toLowerCase().indexOf('about') >= 0){
                console.log('Redirection for About');
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/about' } });
            }
            else if(req.originalUrl.toLowerCase().indexOf('contact') >= 0){
                console.log('Redirection for Contact');
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/contact' } });
            }
            else if(req.originalUrl.toLowerCase().indexOf('faq') >= 0 ){
                console.log('Redirection for faq');
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/faq' } });
            }
            else{  
                console.log('Redirection for everything else');
                res.sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl } }); 
            } 
        }
        //Redirect my old blog location.
        else if(req.originalUrl.toLowerCase().indexOf('bloginstall') > 0){
            res.status(301);    
            var cleaned = req.originalUrl.toLowerCase();
            cleaned = cleaned.replace('/bloginstall','');
            console.log('Cleaned Blog URL:' + cleaned);
            res.redirect(301, 'http://blog.davebrownphotography.com' + cleaned);
        }
        //This is URL cleanup for my original incarnation of my detail urls.
        else if(req.originalUrl.toLowerCase().indexOf('%20') > 0
        || ( req.originalUrl.toLowerCase().indexOf('-') > 0 &&
            req.originalUrl.toLowerCase().indexOf('/pd/') < 0 //And there isn't a /pd/ in it (not the less than sign)
            )
        || (req.originalUrl.toLowerCase().indexOf('imagedetail') >= 0)    
        ){
            //I'm sending it the 404.... keep in mind on image detail, it's still rendering the page, at least
            //the status is correct now though.
            res.status(404).sendFile(root + '/index.html', { headers:{ 'Location' : currentConfig.rootUrl + '/404' } });
        }
        else
        {
           console.log('hit catchall handling not in an aspx page.');
           console.log('Heres the root in the catchall: ' + root);
           res.sendFile(root + '/index.html');
        }
    });
    
    // listen (start app with node server.js) ======================================
    app.listen(currentConfig.port);
    console.log("App listening on port: " + currentConfig.port);
    
