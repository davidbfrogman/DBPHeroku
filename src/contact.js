import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {smoothscroll} from './3rdParty/smoothscroll';
import {dbpConfig} from 'dbpConfig';
import {dbpUtility} from 'dbpUtility';


@inject(HttpClient, smoothscroll, dbpConfig, dbpUtility)
export class contact {
    
    constructor(HttpClient, smoothscroll, dbpConfig, dbpUtility) {
        this.http = HttpClient;
        this.email = {};
        this.smoothscroll = smoothscroll;
        this.dbpConfig = dbpConfig;
        this.dbpUtility = dbpUtility;
        this.heading = 'Contact New York Fashion Photogrpaher';
                
        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.dbpConfig.dbpApiBaseUrl);
        });
    }
    
    loadScript(url, callback)
    {
       $.ajax({
            url: url,
            dataType: 'script',
            success: callback,
            async: true
        });
    }

    attached() {
        $('#contact-response').hide();
        this.smoothscroll.init();
        this.loadGoogleMap();
        
        this.dbpUtility.shrinkHeroModule();
        this.dbpUtility.scrollToTopOfPage();
        this.dbpUtility.showControlsForImageDetail();
        this.dbpUtility.setPageTitle('Contact', true);
        this.dbpUtility.setPageMetaDescription('Contact Dave Brown.', true);
        this.dbpUtility.setPageMetaKeywords('Contact, Get in Touch, Phone, Email, Address', true);
    }

    sendEmail() {

        return this.http.fetch(`email`, {
            method: 'post',
            body: JSON.stringify(this.email),
            headers: { "Accept": "application/json", "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(x => { this.handleConfirmation(); } );
    }

    handleConfirmation() {
        $('#contact-form').hide();
        $('#contact-response').show();
        return;
    }

    loadGoogleMap() {
        if (typeof google === 'undefined') {
            this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAv_1hw7Pv97rQ--BowxPEOkb_ZrxDpa0U', () => {
                this.loadScript('jspm_packages/npm/gmaps@0.4.23/gmaps.js', () => {
                    this.buildMapUserInterface();
                });
            });
        }
        else {
            this.buildMapUserInterface();
        }
    }

    buildMapUserInterface() {
        var mapLocation = new google.maps.LatLng(40.8029069, -73.9532712, 400);

        var $mapis = $('#map');

        if ($mapis.length > 0) {

            var map;
            map = GMaps({
                streetViewControl: true,
                overviewMapControl: true,
                mapTypeControl: true,
                zoomControl: true,
                panControl: true,
                scrollwheel: false,
                center: mapLocation,
                el: '#map',
                zoom: 15,
                styles: [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
            });

            var image = new google.maps.MarkerImage('dist/styles/content/map-icon.png',
                new google.maps.Size(59, 65),
                new google.maps.Point(0, 0),
                new google.maps.Point(24, 42)
                );

            map.addMarker({
                position: mapLocation,
                icon: image,
                title: 'Dave Brown Photography Studios',
                infoWindow: {
                    content: '<p><strong>Dave Brown Photography</strong><br/>135 West 116th St. #4A New York, NY 10026<br/>P: 917-747-8684<br/>E: info@davebrownphotography.com </p>'
                }
            });

        }
    }
}
