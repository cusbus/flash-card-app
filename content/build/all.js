'use strict';

;(function () {
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
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.crud', ['ui.router']);

    angular.module('client.crud').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state('site.flash-cards', {
            url: '/flash-cards',
            views: {
                'content@site': {
                    templateUrl: 'client/crud/flash-cards/flash-cards.html',
                    controller: 'flashCardController as ctrl'
                }
            }
        }).state('site.flash-cards.write', {
            url: '/create',
            views: {
                'card-content': {
                    templateUrl: 'client/crud/flash-cards/write/flash-cards-write.html',
                    controller: 'flashCardWriteController as ctrl'
                }
            }
        }).state('site.flash-cards.list', {
            url: '/list',
            views: {
                'card-content': {
                    templateUrl: 'client/crud/flash-cards/list/flash-cards-list.html',
                    controller: 'flashCardListController as ctrl'
                }
            }
        });
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

    angular.module('client.services', []);
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
    angular.module('client.services').factory('flashCardService', FlashCardServiceFactory);

    FlashCardServiceFactory.$inject = ['$http', '$q'];

    function FlashCardServiceFactory($http, $q) {
        return {
            readAll: _readAll,
            readById: _readById,
            create: _create,
            update: _update,
            delete: _delete
        };

        function _readAll() {
            return $http.get('/api/flash-cards').then(xhrSuccess).catch(onError);
        }

        function _readById(id) {
            return $http.get('/api/flash-cards/' + id).then(xhrSuccess).catch(onError);
        }

        function _create(flashCard) {
            return $http.post('/api/flash-cards', flashCard);
        }

        function _update(flashCard) {
            return $http.put('/api/flash-cards/' + flashCard._id, flashCard);
        }

        function _delete(id) {
            return $http.delete('/api/flash-cards/' + id).then(xhrSuccess).catch(onError);
        }

        //response handlers
        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.crud').controller('flashCardController', FlashCardController);

    FlashCardController.$inject = ['$state', '$log'];

    function FlashCardController($state, $log) {
        var vm = this;

        init();

        function init() {
            $log.log('flash-card crud loaded');
        }
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
'use strict';

;(function () {
    'use strict';

    angular.module('client.crud').controller('flashCardListController', FlashCardListController);

    FlashCardListController.$inject = ['$log', '$state'];

    function FlashCardListController($log, $state) {
        var vm = this;

        init();

        function init() {
            $log.log('list view controller loaded');
        }
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.crud').controller('flashCardWriteController', FlashCardWriteController);

    FlashCardWriteController.$inject = ['$log', '$state', '$stateParams', 'flashCardService'];

    function FlashCardWriteController($log, $state, $stateParams, flashCardService) {
        var vm = this;

        // public variables
        vm.formData = {};

        // public functions
        vm.submit = _submit;

        init();

        function init() {
            $log.log('write controller landed');
        }

        function _submit() {
            flashCardService.create(vm.formData).then(function (result) {
                $log.log(result);
                $state.go('site.flash-cards');
            }).catch(function (err) {
                return $log.log(err);
            });
        }
    }
})();