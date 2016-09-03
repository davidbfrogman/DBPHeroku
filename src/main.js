import 'jquery';

export function configure(aurelia) {
    
    var trackerEnabled = true;
    if(window.location.hostname.toLowerCase().indexOf('localhost') == 0){
        trackerEnabled = false;
    }
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
   .plugin('aurelia-google-analytics', config => {
            config.init('UA-9571004-2');
            config.attach({
                logging: {
                    enabled: true // Set to `true` to have some log messages appear in the browser console.
                },
                pageTracking: {
                    enabled: trackerEnabled // Set to `false` to disable in non-production environments.
                },
                clickTracking: {
                    enabled: trackerEnabled // Set to `false` to disable in non-production environments.
                }
        })
    });

  aurelia.start().then(a => a.setRoot());
}
