;(function(){
    'use strict';

    angular.module('client.crud', ['ui.router'])

    angular.module('client.crud').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider){
        $stateProvider
            .state('site.flash-cards', {
                url: '/flash-cards',
                views: {
                    'content@site': {
                        templateUrl: 'client/crud/flash-cards/flash-cards.html',
                        controller: 'flashCardController as ctrl'
                    }
                }
            })
    }

})();