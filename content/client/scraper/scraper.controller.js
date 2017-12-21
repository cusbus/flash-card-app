;(function(){
    "use strict";

    angular.module('client.scraper')
        .controller('scraperController', ScraperController)
    
    ScraperController.$inject = ['$state', '$log', 'scraperService', '$timeout']

    function ScraperController($state, $log, scraperService, $timeout){
        let vm = this;

        vm.animated = null
        vm.addAnimation = _addAnimation

        init()

        function init(){

        }

        function _addAnimation() {
            vm.animated = { 'flipInX': true }
            $timeout(() => vm.animated = null, 500)
        }

    }

})();