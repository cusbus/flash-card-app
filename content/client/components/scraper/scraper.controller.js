;(function(){
    angular.module('client.scraper').component('scraper', {
        templateUrl: 'client/components/scraper/scraper.html',
        controller: 'scraperComponentController as ctrl',
        bindings: {
            headlines: '<'
        }
    })

    angular.module('client.scraper')
        .controller('scraperComponentController', ScraperComponentController)

    ScraperComponentController.$inject = ['$log', '$window']

    function ScraperComponentController($log, $window) {
        let vm = this

        //public functions
        vm.$onInit = $onInit
        vm.checkTheHeadlines = _checkTheHeadLines
        vm.redirect =_redirect


        function $onInit(){
            $log.log('we have lift off')
        }

        function _checkTheHeadLines() {
            return vm.headlines
        }

        function _redirect(nprURL) {
            $window.open(nprURL, '_blank');
        }
    }

})();