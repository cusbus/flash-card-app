;(function(){
    'use strict';

    angular.module('client.site', ['ui.router', 'ui.bootstrap'])
        
    angular.module('client.site').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.home', {
                url: '/',
                views: {
                    'content@site': {
                        templateUrl: 'client/site/home/home.html',
                        controller: 'mainController as ctrl'
                    }
                }
            })
    }

})();