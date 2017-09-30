import WebFont from 'webfontloader';
import '3rdParty/phantompolyfill';

export class App {

    //This will create our app, which you can think of like a master page, with these child controls
    //the footer is the footer on the page,
    //and my startup class is a control for executing javascript that I want to execute when my app runs.
    constructor() {

    };

    configureRouter(config, router) {

        //This title string gets appended to the Title field that's below in the config.map
        config.title = 'New York Photographer | Fashion | Headshots | Editorial | Advertising';

        // This will remove the hash from the url so we don't have those bad SEO problems
        config.options.pushState = true;
        
        //I'm only going to show the port manager on localhost. Otherwise turn it off.        
        var showPortManInNav = false;
        if(window.location.hostname.toLowerCase().indexOf('localhost') == 0){
            showPortManInNav = true;
        }

        config.map([
            { route: ['portfolio', '', 'Portfolio', 'PORTFOLIO'], name: 'portfolio', moduleId: 'portfolio', nav: true, title: 'Portfolio' },
            { route: ['about','ABOUT','About'], name: 'about', moduleId: 'about', nav: true, title: 'About' },
            { route: ['faq','FAQ','Faq'], name: 'faq', moduleId: 'faq', nav: true, title: 'FAQ' },
            { route: ['contact', 'Contact', 'CONTACT'], name: 'contact', moduleId: 'contact', nav: true, title: 'Contact' },
            { route: ['portfolioManager'], name: 'portfolioManager', moduleId: './PortfolioManager/index', nav: showPortManInNav, title: 'Port Manager' },
            { route: ['imagedetail'], name: 'imagedetail', moduleId: 'imagedetail', nav: false, title: 'Portfolio Item Image Detail' },
            { route: ['portlist'], name: 'portlist', moduleId: 'portlist', nav: false, title: 'Portfolio Listing' },
            { route: ['pd/:detailname/:id'], name: 'imagedetail', moduleId: 'imagedetail', nav: false, title: 'Photography' },
            { route: ['404'], name: 'pagenotfound', moduleId: 'pagenotfound', nav: false, title: '404'}
        ]).mapUnknownRoutes('pagenotfound', 'pagenotfound');
        
        this.router = router;
    }

    attached() {
        //By default while we're deving we're going to default going to the port manager.
        //this.router.navigateToRoute('portfolioManager');
        //@import url("http://fonts.googleapis.com/css?family=Dosis|Libre+Baskerville:400italic|Open+Sans:300,400,400italic,700|Playfair+Display:400,700italic,400italic,700,900|Source+Sans+Pro");
        // WebFont.load({
        //     google: {
        //         families: ['Dosis', 'Open Sans:300', 'Playfair Display:400']
        //     }
        // });
        this.loadScript('https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js');
        this.loadcssfile("https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css");
    }

    loadScript(src) {
        return new Promise(function (resolve, reject) {
            var s;
            s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.getElementsByTagName("body")[0].appendChild(s);
        });
    }

    loadcssfile(filename) {
        return new Promise(function (resolve, reject){
        console.log('inserting css for ion icons');
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("media","none");
        fileref.setAttribute("onload","if(media!='all')media='all'");

        document.getElementsByTagName("body")[0].appendChild(fileref);
        });
    }
}
