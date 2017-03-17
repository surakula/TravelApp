var travelApp = (function(angular){
    'use strict'

        var app = angular.module("TravelApp",[]);

        app.constant("SKYSCANNER_API",{
            BROWSE_QUOTES: "{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}",
            SEARCH_FLIGHTS:"/searchFlight",
            LOGIN_URL:"/login",
            COUNTRY_URL:"/allCountries"
        });

        app.constant("USA",{
          C_CODE:"US",
          LOCALE:"en-US",
          CURRENCY:"USD"

        },"UK",{
          C_CODE:"UK",
          LOCALE:"en-GB",
          CURRENCY:"GBP"

        },"IN",{
          C_CODE:"IN",
          LOCALE:"en-US",
          CURRENCY:"INR"

        });
        return app;


})(angular)

