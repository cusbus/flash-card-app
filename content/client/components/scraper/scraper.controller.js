;(function(){
    angular.module('client.scraper').component('scraper', {
        templateUrl: 'client/components/scraper/scraper.html',
        controller: 'scraperComponentController as ctrl'
    })

    angular.module('client.scraper')
        .controller('scraperComponentController', ScraperComponentController)

    ScraperComponentController.$inject = ['$log', 'scraperService']

    function ScraperComponentController($log, scraperService) {
        let vm = this
        vm.$onInit = $onInit

        function $onInit(){
            $log.log('we have lift off')
        }

    }

})();