import {inject} from 'aurelia-framework';
import './../3rdParty/appear.js';
import {InstagramService} from './../service/InstagramService.js';

@inject(InstagramService)
export class dbprecentinstagrams {
    userdata = {};
    recent = [];

    constructor(InstagramService) {
        console.log('In the constructor for recent instagrams')
        this.InstagramService = InstagramService;
    }

    //Attached here is different than activate.  I think activate is only for when you actually navigate to that page.
    //attached here is for controls when they're attached to the page.
    attached() {
        this.InstagramService.recentMedia()
            .then(res => res.response.data)
            .then(recent => { this.recent = recent });
        //.then(x => { console.log(this.recent)});

        this.InstagramService.userDetails()
            .then(res => res.response.data)
            .then(userdata => { this.userdata = userdata })
            .then(() => { $('#img-profile').attr("src", this.userdata.profile_picture); });

        this.drawCounters();
    }

    hide() {
        $('#sec-recent-insta').hide();
    }

    show() {
        $('#sec-recent-insta').show();
    }

    drawCounters() {
        $('.progress-bar').each(function (i) {
            $(this).appear(function () {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({ 'width': percent + '%' });
                $(this).find('span').animate({ 'opacity': 1 }, 900);
                $(this).find('span').countTo({ from: 0, to: percent, speed: 900, refreshInterval: 30 });
            });
        });

        $('.counter-item').each(function (i) {
            $(this).appear(function () {
                var number = $(this).find('.counter-number').data('number');
                $(this).find('.counter-number span').countTo({ from: 0, to: number, speed: 1200, refreshInterval: 30 });
            });
        });
    }
}
