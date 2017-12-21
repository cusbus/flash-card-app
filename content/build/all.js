'use strict';

;(function () {
    'use strict';

    angular.module('client', [
    //3rd party
    'ui.router', 'ui.bootstrap', 'btford.markdown',

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
            },
            resolve: {
                flashCard: checkForIdParam
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
                flashCard: checkForIdParam
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
        }).state('site.flash-cards.detail', {
            url: '/details/:id',
            views: {
                'card-content': {
                    templateUrl: 'client/crud/flash-cards/details/flash-cards-detail.html',
                    controller: 'flashCardDetailController as ctrl'
                }
            },
            resolve: {
                flashCard: checkForIdParam
            }
        }).state('site.flash-cards.practice', {
            url: '/practice',
            views: {
                'card-content': {
                    templateUrl: 'client/crud/flash-cards/practice/flash-cards-practice.html',
                    controller: 'flashCardPracticeController as ctrl'
                }
            },
            resolve: {
                flashCards: getAllFlashCards
            }
        });

        getAllFlashCards.$inject = ['flashCardService'];
        checkForIdParam.$inject = ['flashCardService', '$stateParams'];

        function getAllFlashCards(flashCardService) {
            return flashCardService.readAll().then(function (flashCards) {
                return flashCards.items;
            });
        }

        function checkForIdParam(flashCardService, $stateParams) {
            if ($stateParams.id) {
                return flashCardService.readById($stateParams.id).then(function (flashCard) {
                    return flashCard.item;
                });
            } else {
                return null;
            }
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

        //public functions
        vm.addAnimationCreate = _addAnimationCreate;
        vm.addAnimationPractice = _addAnimationPractice;
        vm.addAnimationList = _addAnimationList;

        init();

        function init() {}

        function _addAnimationCreate() {
            if ($state.current.name == 'site.flash-cards.practice') {
                return { 'flipOutX': true };
            }
            if ($state.current.name == 'site.flash-cards') {
                return { 'flipInX': true };
            }
            if ($state.current.name == 'site.flash-cards.write' && $state.current.name != 'site.flash-cards') {
                return { 'flipOutX': true };
            } else {
                return { 'flipInX': true };
            }
        }

        function _addAnimationList() {
            if ($state.current.name == 'site.flash-cards.practice') {
                return { 'flipOutX': true };
            }
            if ($state.current.name == 'site.flash-cards') {
                return { 'flipInX': true };
            }
            if ($state.current.name == 'site.flash-cards.list' && $state.current.name != 'site.flash-cards') {
                return { 'flipOutX': true };
            } else {
                return { 'flipInX': true };
            }
        }

        function _addAnimationPractice() {
            if ($state.current.name == 'site.flash-cards') {
                return { 'flipInX': true };
            } else {
                return { 'fadeOut': true };
            }
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

    angular.module('client.crud').controller('flashCardDetailController', FlashCardDetailController);

    FlashCardDetailController.$inject = ['$state', '$stateParams', '$log', 'flashCard', 'flashCardService'];

    function FlashCardDetailController($state, $stateParams, $log, flashCard, flashCardService) {
        //public variables
        var vm = this;
        vm.flashCard = {};

        //public functions
        vm.delete = _delete;

        init();

        function init() {
            vm.flashCard = flashCard;
        }

        function _delete(id) {
            flashCardService.delete(id).then(function (result) {
                $log.log(result);
                $state.go('site.flash-cards.list', null, { reload: true });
            });
        }
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

        //public functions
        vm.delete = _delete;

        init();

        function init() {
            vm.flashCards = flashCards;
        }

        function _delete(id, index) {
            flashCardService.delete(id).then(function (result) {
                $log.log(result);
                vm.flashCards.splice(index, 1);
            }).catch(function (error) {
                return $log.log(error);
            });
        }
    }
})();
'use strict';

;(function () {
    'use strict';

    angular.module('client.crud').controller('flashCardPracticeController', FlashCardPracticeController);

    FlashCardPracticeController.$inject = ['$log', '$state', 'flashCards'];

    function FlashCardPracticeController($log, $state, flashCards) {

        var vm = this;

        //vars for toggling current card
        vm.toggleQuestion = true;
        vm.toggleAnswer = false;

        //carousel vars 
        vm.currentIndex = null;
        vm.currentFlashCard = null;
        var currentFlashCardArray = []; // public var for filter func

        //public functions
        vm.filterCardTopics = _filterCardTopics;
        vm.toggleQA = _toggleQA;
        vm.updateCarouselIndex = _updateCarouselIndex;
        vm.refreshCarouselCard = _refreshCarouselCard;

        init();

        function init() {
            currentFlashCardArray = flashCards;

            //carousel starting point along with an index
            vm.currentFlashCard = currentFlashCardArray[0];
            vm.currentIndex = 0;
        }

        function _filterCardTopics(topic) {

            //for launch and catch all
            if (topic == "all") {
                return currentFlashCardArray = flashCards;
            }

            //filter array
            currentFlashCardArray = flashCards.filter(function (card) {
                return card.category == topic || card.subCategory == topic;
            });

            //reset carousel vars
            vm.currentFlashCard = currentFlashCardArray[0];
            vm.currentIndex = 0;

            //invoke refresh
            _refreshCarouselCard('Q');
        }

        function _updateCarouselIndex(direction) {
            //ensures questions always displayed when navigating
            if (vm.toggleAnswer) {
                _toggleQA();
            }

            //handling previous click
            if (direction == 'previous') {
                if (vm.currentIndex === 0) {
                    vm.currentIndex = currentFlashCardArray.length - 1;
                } else {
                    vm.currentIndex = vm.currentIndex - 1;
                }
            }
            //handling next click
            if (direction == 'next') {
                if (vm.currentIndex == currentFlashCardArray.length - 1) {
                    vm.currentIndex = 0;
                } else {
                    vm.currentIndex = vm.currentIndex + 1;
                }
            }
        }

        function _refreshCarouselCard(qOrA) {
            vm.currentFlashCard = currentFlashCardArray[vm.currentIndex];
            if (qOrA == 'Q') {
                return vm.currentFlashCard.question;
            }
            if (qOrA == 'A') {
                return vm.currentFlashCard.answer;
            }
        }

        function _toggleQA() {
            vm.toggleAnswer = !vm.toggleAnswer;
            vm.toggleQuestion = !vm.toggleQuestion;
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
        vm.tagline = null;

        // public functions
        vm.submit = _submit;
        vm.goToMainView = _goToMainView;

        init();

        function init() {
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
            } else {
                vm.tagline = 'Create';
            }
        }

        function _submit() {
            if (vm.formData._id) {
                flashCardService.update(vm.formData).then(function (result) {
                    $log.log(result);
                    $state.go('site.flash-cards.list');
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

        function _goToMainView() {
            $state.go('site.flash-cards');
        }
    }
})();