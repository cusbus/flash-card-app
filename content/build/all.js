'use strict';

(function () {
    'use strict';

    angular.module('client', [
    //3rd party
    'ui.router', 'ui.bootstrap',

    //base 
    'client.layout',

    //services
    'client.services',

    //views & controllers
    'client.site', 'client.crud']);

    angular.module('client').config(RouteConfig).run(StateErrorHandler);

    StateErrorHandler.$inject = ['$rootScope', '$log'];

    function StateErrorHandler($rootScope, $log) {
        $rootScope.$on('$stateChangeError', function (info) {
            return $log.log(info);
        });
    }

    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/otherwise');
        $locationProvider.html5mode(true);
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('client.layout', ['ui-router', 'client.services']);

    angular.module('client.layout').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('site', {
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
        });
    }
})();