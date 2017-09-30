import {inject} from 'aurelia-framework';
import {dbpParallax} from '../3rdParty/dbpParallax';


@inject(dbpParallax)
export class dbpheader {
	heading = 'New York Fashion Photographer';
	portfolioBooks = [];
    mobileTest = false;

	constructor(dbpParallax) {
		this.dbpParallax = dbpParallax;
	}
    
    scrollDownForDumbUser(){
       if($(window).scrollTop() < 10)
       {
            $('html, body').animate({
                scrollTop: 300
            }, 1000);
        }
    }
    
    get isMobile(){
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		} else {
			return false;
		}
    }

	attached() {
		
		/* ---------------------------------------------- /*
		   * Setting background of modules
		  /* ---------------------------------------------- */
		var moduleHero = $('#hero'),
			modules = $('.module-hero, .module, .module-small'),
			windowWidth = Math.max($(window).width(), window.innerWidth),
			mobileTest


		modules.each(function () {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		$(window).resize(function () {
			new dbpheader().buildModuleHero(moduleHero);
		});

		/* ---------------------------------------------- /*
		 * Parallax
		/* ---------------------------------------------- */
		if(!this.isMobile)
        {
            this.dbpParallax.init();
            $('#hero.module-parallax').parallax('50%', 40 , 0.4);
        }

		/* ---------------------------------------------- /*
		 * Full height module
		/* ---------------------------------------------- */

		this.buildModuleHero(moduleHero);
	}

	buildModuleHero(moduleHero) {
		if (moduleHero.length > 0) {
			if (moduleHero.hasClass('module-full-height')) {
				moduleHero.height($(window).height());
			} else {
				moduleHero.height($(window).height() * 0.35);
			}
		}
	}
    
    showHeroCaption()
    {
        $('.hero-caption').fadeIn(500);
    }
    
    shrinkHeroModule(height, offsetForImage){
        $('#hero').height(height);
        if(!this.isMobile){
            //The 3 parameters here are ypos percentage, top offset in pixels, and speed.
            //default should be 175
            $('#hero.module-parallax').parallax('50%', offsetForImage, 0.4);
        }
        
        $('.hero-caption').fadeOut(500);
        $('.mouse-icon').fadeOut(500);
    }
}
