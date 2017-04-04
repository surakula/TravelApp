var appConstants=angular.module('travel.constants',[]);
    appConstants.constant('CONSTANT',{"API_URL":"http://localhost:8080"});
    appConstants.constant("SKYSCANNER_API",{
        BROWSE_QUOTES: "{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}",
        SEARCH_FLIGHTS:"/api/searchFlight",
        LOGIN_URL:"/loadUserProfile",
        COUNTRY_URL:"/api/allCountries"
    });

    appConstants.constant("USA",{
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
