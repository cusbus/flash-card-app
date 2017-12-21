;(function(){
    "use strict";

    angular.module('client.scraper')
        .controller('scraperController', ScraperController)
    
    ScraperController.$inject = ['$state', '$log', 'scraperService']

    function ScraperController($state, $log, scraperService){
        let vm = this;

        init()

        function init(){

        }

    }

})();