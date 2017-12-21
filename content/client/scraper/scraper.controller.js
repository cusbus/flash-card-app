;(function(){
    "use strict";

    angular.module('client.scraper')
        .controller('scraperController', ScraperController)
    
    ScraperController.$inject = ['$state', '$log', 'scraperService', '$timeout']

    function ScraperController($state, $log, scraperService, $timeout){
        
        //public vars
        let vm = this;
        vm.animated = null
        vm.tagline = null
        vm.headlines = null

        //public functions
        vm.$onInit = init
        vm.initiateScrape = _initiateScrape

        function init(){
            vm.tagline = 'Click to engage.'
            _addAnimation()
        }

        function _initiateScrape() {
            _addAnimation()
            scraperService.readAll()
                .then(headlines => vm.headlines = headlines.items)
        }

        function _addAnimation() {
            vm.animated = { 'flipInX': true }
            $timeout(() => vm.animated = null, 500)
            vm.tagline = "Engaged!"
        }

    }

})();