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
                },
                resolve: {
                    flashCard: checkForIdParam
                }
            })
            .state('site.flash-cards.edit', {
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
            .state('site.flash-cards.list', {
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
            .state('site.flash-cards.practice', {
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
            })

            getAllFlashCards.$inject = ['flashCardService']
            checkForIdParam.$inject = ['flashCardService', '$stateParams']

            function getAllFlashCards(flashCardService){
                return flashCardService.readAll()
                    .then(flashCards => flashCards.items)
            }

            function checkForIdParam(flashCardService, $stateParams) {
                if ($stateParams.id) {
                    return flashCardService.readById($stateParams.id)
                        .then(flashCard => flashCard.item)
                } else { return null }
            }

    }
})();