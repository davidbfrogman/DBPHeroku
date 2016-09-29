var port     = process.env.PORT || 8080;        // set our port
var prodDomain = 'www.davebrownphotography.com';       //change this whenever we setup our cname

// configuration =================
    var config = {
        devConfig : {
          production : false,  
          cacheShort : '0',
          cacheLong : '0',
          prerenderServiceURL: 'http://localhost:3000',
          rootUrl : 'http://localhost:' + port,
          port: port,   
        },
        prodConfig : {
            production : true,
            cacheShort : '7d',  //So apparently google freaks out if the browser cache is less than 7 days. 
            cacheLong : '14d',
            prerenderServiceURL: 'http://service.prerender.io', //This probably needs to change.
            rootUrl : 'http://' + prodDomain,
            port : port,
        },
    }

module.exports = process.env.prod == 'true' ? config.prodConfig : config.devConfig;;    

