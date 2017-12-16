'use strict';

;(function () {
    'use strict';

    angular.module('client', [
    //3rd party
    'ui.router', 'ui.bootstrap',

    //base 
    'client.layout',

    //services
    // 'client.services',

    //views & controllers
    'client.site']
    // 'client.crud'

    );

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

    angular.module('client.layout', ['ui.router']);

    angular.module('client.layout').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('site', {
            abstract: true,
            views: {
                root: {
                    templateUrl: 'client/layout/site.tpl.html'
                }
            }
        });
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.site', ['ui.router', 'ui.bootstrap']);

    angular.module('client.site').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('site.home', {
            url: '/',
            views: {
                'content@site': {
                    templateUrl: 'client/site/home/home.html',
                    controller: 'mainController as ctrl'
                }
            }
        });
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.site').controller('mainController', MainController);

    MainController.$inject = ['$state', '$log'];

    function MainController($state, $log) {
        var vm = this;
    }
})();