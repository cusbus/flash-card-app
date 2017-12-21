;(function(){
    "use strict";

    angular.module('client.scraper')
        .controller('scraperController', ScraperController)
    
    ScraperController.$inject = ['$state', '$log']

    function ScraperController($state, $log){
        let vm = this;

        init()

        function init(){

        }

    }

})();