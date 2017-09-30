import {inject} from 'aurelia-framework';
import {dbpheader} from 'controls/dbpheader';
import {dbprecentinstagrams} from 'controls/dbprecentinstagrams';
import {dbprecentposts} from 'controls/dbprecentposts';


@inject(dbpheader, dbprecentinstagrams, dbprecentposts)
export class dbpUtility {
    constructor(dbpheader, dbprecentinstagrams, dbprecentposts) {
        this.dbpheader = dbpheader;
        this.dbprecentinstagrams = dbprecentinstagrams;
        this.dbprecentposts = dbprecentposts;
    };

    get isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    setPageTitle(title, useDefaults) {
        if (useDefaults) {
            document.head.querySelector('title').innerText = 'New York Photographer | Fashion | Headshots | Advertising | ' + title;
        }
        else {
            document.head.querySelector('title').innerText = title;
        }
    }
    
    setPageMetaDescription(description, useDefaults) {
        if (useDefaults) {
            document.getElementsByTagName('meta')['description'].content = 'New York Photographer Dave Brown specializes in Fashion, Headshots, Advertising, Commercial, and Editorial Portrait Photography. ' + description;
        }
        else {
            document.getElementsByTagName('meta')['description'].content = description;
        }
    }
    
    setPageMetaKeywords(keywords, useDefaults) {
        if (useDefaults) {
            document.getElementsByTagName('meta')['keywords'].content = 'New York photographer, New York fashion photographer, New York editorial portrait photographer, headshot photographer, czech republic, ' + keywords;
        }
        else {
            document.getElementsByTagName('meta')['keywords'].content = keywords;
        }
    }
    
    
    setMetaDescription(description){
        
    }

    hideControlsForImageDetail() {
        this.dbprecentinstagrams.hide();
        this.dbprecentposts.hide();
    }

    showControlsForImageDetail() {
        this.dbprecentinstagrams.show();
        this.dbprecentposts.show();
    }

    scrollToTopOfPage() {
        if ($(window).scrollTop() > 20) {
            if (this.isMobile) {
                $('body').scrollTop(0);
            }
            else {
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            }
        }
    }

    shrinkHeroModule() {
        this.dbpheader.shrinkHeroModule(350, 175);
    }
}

