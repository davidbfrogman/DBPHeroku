import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Router} from 'aurelia-router';
import {PortfolioManagerService} from './PortfolioManager/PortfolioManagerService';
import {dbpheader} from 'controls/dbpheader';
import {dbpUtility} from 'dbpUtility';
import Isotope from 'isotope-layout';
import Packery from 'isotope-packery';
import imagesloaded from 'imagesloaded';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'npm:photoswipe@4.1.1/dist/photoswipe-ui-default.min.js';

@inject(HttpClient, PortfolioManagerService, dbpheader, dbpUtility)
export class Portfolio {
    heading = 'Portfolio';
    portfolioBooks = [];
    isotopeInstance = {};
    portfolioCategories = [];
    generalAnimationDuration = 300;
    currentFilter = '*';

    constructor(http, PortfolioManagerService, dbpheader, dbpUtility) {
        this.http = http;
        this.service = PortfolioManagerService;
        this.dbpheader = dbpheader;
        this.dbpUtility = dbpUtility;
    }

    //By putting this call here in the activate method.  
    //That means that the other attached method will actually be called with the data that it needs  
    //Before when I had this code in the attached mehtod, the data hadn't actually came back from the server yet. 
    //This meant that when called fixLayout, there weren't any images for isotope, and images loaded to operate on.
    //I'm fairly certain that return there is wildly important.  It's something to keep in mind next time.
    activate() {
        //We want to get a nice small concise object for our categories, so we won't
        //have to go through the categories on our books.
        //this will also give us a nice count.
        this.service.getGetPortfolioCategories()
            .then(portfolioCategories => {
                this.portfolioCategories = portfolioCategories;
            })

        return this.service.getPortfolioBooksForDisplay()
            .then(portfolioBooks => {
                this.portfolioBooks = portfolioBooks;
                var i = 0;

                var fashionCount = 0;
                var editorialCount = 0;
                var headshotCount = 0;
                var editorialPortraitCount = 0;
                var bandCount = 0;

                for (var book of this.portfolioBooks) {
                    //Now we need to remove the space from the string because later we're going to filter on it.
                    //For instance the editorial portrait category is something we want to filter on.
                    //if(i >2){ delete this.portfolioBooks[i]; }
                    book.prettyUrl = encodeURI('/pd/' + book.title + '-' + book.subtitle + '-Prague' + '-' + book.category + '-' + 'photographer' + '/' + book.id)
                        .replace(/%20/g, '-')
                        .replace('.', '')
                        .replace('-null','');
                        
                    book.prettyTitle = encodeURI(book.title + '-' + book.subtitle + '-Prague' + '-' + book.category + '-' + 'photographer')
                        .replace(/%20/g, '-')
                        .replace('.', '')
                        .replace('-null','');
                        
                    i++;
                    book.category = book.category.replace(/\s+/g, '');
                    book.items.sort(function(a, b) {
                        return parseInt(a.order) - parseInt(b.order);
                    })
                }

                //Basically I want to filter out portfolio books if it's mobile.  I don't want to make users 
                //wait forever to download all my images.
                //I'm commenting this out for now.  It works, but I'm not exactly happy with how my port looks 
                //without everything in there.
                // if (this.dbpUtility.isMobile) {
                //     this.portfolioBooks = this.portfolioBooks.filter(function(book) {
                //         if (book.category == 'Fashion' && fashionCount < 5) {
                //             fashionCount++;
                //             console.log('Filtering Fashion Images for Mobile:' + fashionCount);
                //             return true;
                //         }
                //         if (book.category == 'Editorial' && editorialCount < 3) {
                //             editorialCount++;
                //             console.log('Filtering Editorial Images for Mobile:' + editorialCount);
                //             return true;
                //         }
                //         if (book.category == 'EditorialPortrait' && editorialPortraitCount < 6) {
                //             editorialPortraitCount++;
                //             console.log('Filtering Editorial Portrait Images for Mobile:' + editorialPortraitCount);
                //             return true;
                //         }
                //         if (book.category == 'Band' && bandCount < 3) {
                //             bandCount++;
                //             console.log('Filtering Band Images for Mobile:' + bandCount);
                //             return true;
                //         }
                //         if (book.category == 'Headshot' && headshotCount < 6) {
                //             headshotCount++;
                //             console.log('Filtering Band Images for Mobile:' + headshotCount);
                //             return true;
                //         }
                //         return false;
                //     });
                // }
            });
    }

    attached() {
        this.worksgrid = $('#works-grid');
        this.filters = $('#filters');
        this.secPhotoswipe = $('#sec-photo-swipe');
        this.portfolioGrid = $('#portfolio-grid');
        this.isotopeBuilt = false;
        var self = this;

        this.dbpUtility.scrollToTopOfPage();
        this.dbpUtility.showControlsForImageDetail();
        this.dbpUtility.setPageTitle('Portfolio', true);
        this.dbpUtility.setPageMetaDescription('Portfolio of Dave Brown.', true);
        this.dbpUtility.setPageMetaKeywords('Portfolio, Work, Images, Book', true);
        
        //this means that this is prerender looking at my site
        if(window.location.href.indexOf('_escaped_') >= 0)
        {
            $('#div-extra-content').show();
        }
        else
        {
            $('#div-extra-content').hide();
        }
        
        //I want to make my portfolio page canonical only when the word portfolio isn't in it
        if (window.location.href.indexOf('portfolio') <= 0) {
            var link = document.createElement('link');
            link.href = window.location.href;
            link.rel = 'canonical';
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        //find the all filter on my portfolio, and add current class to it.
        $('#All').addClass('current');

        //Even if we come back from the contact, and FAQ page, I want the text to show on my heading.  
        this.dbpheader.showHeroCaption();

        $(window).on('resize', () => {
            self.initializeIsotope(self);
        });

        this.worksgrid.imagesLoaded()
            .done((instance) => {
                //build out the isotope instance
                self.initializeIsotope(self);
            })
            .progress((instance, image) => {
                //TODO: Figure out how to relayout the isotope instance
                //as the images are loaded.
                if (instance.progressedCount % 5 == 0) {
                    self.initializeIsotope(self);
                }
            });
    }

    initializeIsotope(self) {
        if (!self.isotopeBuilt) {
            self.buildIsotope();
            self.isotopeBuilt = true;
        }
        self.isotopeInstance.arrange({ filter: self.currentFilter });
    }

    showPortfolioItems(book, item) {
        this.buildPhotoswipe(book, item);
    }

    filterPortfolio(catfilter, catName) {
        catfilter = catfilter.replace(/\s+/g, '');
        catName = catName.replace(/\s+/g, '');
        $('.current').removeClass('current');
        $('#' + catName).addClass('current');

        if (catfilter != '*') {
            catfilter = '.' + catfilter;
        }
        this.currentFilter = catfilter;
        this.isotopeInstance.arrange({ filter: this.currentFilter })

        return false;
    }

    buildIsotope() {
        this.isotopeInstance = new Isotope(this.worksgrid[0], {
            layoutMode: 'packery',
            itemSelector: '.grid-item',
            transitionDuration: '0.3s',
            packery: { gutter: 20 }
        });

        if ($(window).width() < 500) {
            this.isotopeInstance.arrange({ percentPosition: true, packery: { gutter: 5 } });
        }
        else if ($(window).width() < 769) {
            this.isotopeInstance.arrange({ percentPosition: true, packery: { gutter: 10 } });
        }
        //Google Nexus sizing probably applies to most tablets
        else if ($(window).width() < 900) {
            this.isotopeInstance.arrange({ percentPosition: true, packery: { gutter: 10 } });
        }
    }

    buildPhotoswipe(book, item) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var items = [];
        var slideStartIndex = 0;

        slideStartIndex = book.items.map(function(x) { return x.id; }).indexOf(item.id);

        for (var item of book.items) {
            //We're basically saying if the item has zero dimensions the default is going to be 800x534.
            var w = item.width == 0 ? 534 : item.width;
            var h = item.height == 0 ? 800 : item.height;

            items.push({
                src: '/dist/images/fulls/' + item.imageURL,
                w: w,
                h: h
            });
        }

        this.secPhotoswipe.hide();
        this.secPhotoswipe.fadeIn(this.generalAnimationDuration);

        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: slideStartIndex, // start at first slide or the slide that was clicked.
            bgOpacity: 1,
            hideAnimationDuration: 0,
            showAnimationDuration: 0,
            closeOnScroll: false,
            history: true,
            preload: [1, 4]
        };
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();

    }
} //closing class
