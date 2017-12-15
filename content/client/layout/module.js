(function() {
    'use strict'

    angular.module('client.layout', ['ui-router', 'client.services'])

    angular.module('client.layout').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site', {
                // abstract: false,
                url: '/home',
                views: {
                    root: {
                        templateUrl: 'client/layout/site.tpl.html',
                        controller: 'navigationController as ctrl'
                    }
                },
                resolve: {
                    dopppppe: dope
                }
            })

    }

})()