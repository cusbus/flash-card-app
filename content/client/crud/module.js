
//------------ flash-card crud -------------------------------------------

;(function(){
    'use strict';

    angular.module('client.crud', ['ui.router'])

    angular.module('client.crud').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider){
        $stateProvider
            .state('site.flash-cards.manage-cards', {
                url: '/manage-cards',
                views: {
                    'content@site': {
                        templateUrl: 'client/crud/flash-cards/flash-card-crud.html',
                        controller: 'flashCardCrudController as ctrl'
                    }
                }
            })
            .state('site.flash-cards.manage-cards.write', {
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
            })
            .state('site.flash-cards.manage-cards.edit', {
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
            })
            .state('site.flash-cards.manage-cards.list', {
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
            })
            .state('site.flash-cards.manage-cards.detail', {
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
            })

            getAllFlashCards.$inject = ['flashCardService']

            function getAllFlashCards(flashCardService){
                return flashCardService.readAll()
                    .then(flashCards => flashCards.items)
            }

            checkForIdParam.$inject = ['flashCardService', '$stateParams']
            
            function checkForIdParam(flashCardService, $stateParams) {
                if ($stateParams.id) {
                    return flashCardService.readById($stateParams.id)
                        .then(flashCard => flashCard.item)
                } else { return null }
            }

    }
})();

//------------ user crud -------------------------------------------

;(function(){
    'use strict';

    angular.module('client.crud').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site.flash-cards.manage-users', {
                url: '/manage-users',
                views: {
                    'content@site': {
                        templateUrl: 'client/crud/users/user-crud.html',
                        controller: 'userCrudController as ctrl'
                    }
                }
            })
            .state('site.flash-cards.manage-users.write', {
                url: '/create',
                views: {
                    'card-content': {
                        templateUrl: 'client/crud/users/write/user-crud.html',
                        controller: 'userWriteController as ctrl'
                    }
                }
                // resolve: {
                //     user: checkForIdParam
                // }
            })

            // checkForIdParam.$inject = ['userService', '$stateParams']
            
            // function checkForIdParam(userService, $stateParams) {
            //     if ($stateParams.id) {
            //         return userService.readById($stateParams.id)
            //             .then(user => user.item)
            //     } else { return null }
            // }
    }
})();
