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
        }).state('site.flash-cards.edit', {
            url: '/edit/:id',
            views: {
                'card-content': {
                    templateUrl: 'client/crud/flash-cards/write/flash-cards-write.html',
                    controller: 'flashCardWriteController as ctrl'
                }
            },
            resolve: {
                flashCard: getSingleFlashCard
            }
        }).state('site.flash-cards.list', {
            url: '/list',
            views: {
                'card-content': {
                    templateUrl: 'client/crud/flash-cards/list/flash-cards-list.html',
                    controller: 'flashCardListController as ctrl'
                }
            },
            resolve: {
                flashCards: getAllFlashCards
            }
        });

        getAllFlashCards.$inject = ['flashCardService'];
        getSingleFlashCard.$inject = ['flashCardService', '$stateParams'];

        function getAllFlashCards(flashCardService) {
            return flashCardService.readAll().then(function (flashCards) {
                return flashCards.items;
            });
        }

        function getSingleFlashCard(flashCardService, $stateParams) {
            return flashCardService.readById($stateParams.id).then(function (flashCard) {
                return flashCard.item;
            });
        }
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

    FlashCardListController.$inject = ['$log', '$state', 'flashCards', 'flashCardService'];

    function FlashCardListController($log, $state, flashCards, flashCardService) {

        //public variables
        var vm = this;
        vm.flashCards = null;

        init();

        function init() {
            vm.flashCards = flashCards;
        }
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.crud').controller('flashCardWriteController', FlashCardWriteController);

    FlashCardWriteController.$inject = ['$log', '$state', '$stateParams', 'flashCardService', 'flashCard'];

    function FlashCardWriteController($log, $state, $stateParams, flashCardService, flashCard) {
        var vm = this;

        // public variables
        vm.formData = {};
        vm.tagline = "Create";

        // public functions
        vm.submit = _submit;

        init();

        function init() {
            $log.log('write controller landed');
            _checkAndSetMode();
        }

        function _checkAndSetMode() {
            if ($state.current.name === 'site.flash-cards.edit') {
                vm.tagline = "Edit";
                vm.formData = {
                    _id: flashCard._id,
                    question: flashCard.question,
                    answer: flashCard.answer,
                    category: flashCard.category,
                    subCategory: flashCard.subCategory
                };
            }
        }

        function _submit() {
            if (vm.formData._id) {
                flashCardService.update(vm.formData).then(function (result) {
                    $log.log(result);
                    $state.go('site.flash-cards');
                }).catch(function (err) {
                    return $log.log(err);
                });
            } else {
                flashCardService.create(vm.formData).then(function (result) {
                    $log.log(result);
                    $state.go('site.flash-cards');
                }).catch(function (err) {
                    return $log.log(err);
                });
            }
        }
    }
})();