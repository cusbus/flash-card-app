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
            .state('site.flash-cards.write', {
                url: '/create',
                views: {
                    'card-content': {
                        templateUrl: 'client/crud/flash-cards/write/flash-cards-write.html',
                        controller: 'flashCardWriteController as ctrl'
                    }
                }
            })
            .state('site.flash-cards.list', {
                url: '/list',
                views: {
                    'card-content': {
                        templateUrl: 'client/crud/flash-cards/list/flash-cards-list.html',
                        controller: 'flashCardListController as ctrl'
                    }
                }
            })
    }

})();