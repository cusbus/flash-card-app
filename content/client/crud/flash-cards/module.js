;(function(){
    'use strict';

    angular.module('client.crud', ['ui.router'])

    angular.module('client.crud').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider){
        $stateProvider
            .state('site.flash-cards.manage', {
                url: '/manage',
                views: {
                    'content@site': {
                        templateUrl: 'client/crud/flash-cards/flash-card-crud.html',
                        controller: 'flashCardCrudController as ctrl'
                    }
                }
            })
            .state('site.flash-cards.manage.write', {
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
            .state('site.flash-cards.manage.edit', {
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
            .state('site.flash-cards.manage.list', {
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
            .state('site.flash-cards.detail', {
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