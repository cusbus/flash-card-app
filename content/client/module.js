(function() {
    'use strict';
    angular.module('client', [
        //3rd party
        'ui.router',
        'ui.bootstrap',

        //services
        'client.services',

        //views & controllers
        'client.site',
        'client.crud'

    ])

    angular.module('client')
        .config(RouteConfig)
        .run(StateErrorHandler)

    StateErrorHandler.$inject = ['$rootScope', '$log']

    function StateErrorHandler($rootScope, $log) {
        $rootScope.$on('$stateChangeError', info => $log.log(info))
    }

    RouteConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider'
    ]
    
    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/otherwise')
        $locationProvider.html5mode(true)
    }

})()