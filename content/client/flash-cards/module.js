;(function(){
    'use strict';

    angular.module('client.flash-cards', ['ui.router'])

    angular.module('client.flash-cards').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider){
        $stateProvider
            .state('site.flash-cards', {
                url: '/flash-cards',
                views: {
                    'content@site': {
                        templateUrl: 'client/flash-cards/flash-cards.html',
                        controller: 'flashCardController as ctrl'
                    }
                }
            })
            .state('site.flash-cards.practice', {
                url: '/practice',
                views: {
                    'card-content': {
                        templateUrl: 'client/flash-cards/practice/flash-cards-practice.html',
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