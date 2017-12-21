;(function(){
    'use strict';

    angular.module('client.scraper', ['ui.router'])

    angular.module('client.scraper').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider){
        $stateProvider
            .state('site.scraper', {
                url: '/scraper',
                views: {
                    'content@site': {
                        templateUrl: 'client/scraper/scraper.html',
                        controller: 'scraperController as ctrl'
                    }
                }
            })
    }

})();