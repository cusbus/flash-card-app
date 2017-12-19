;(function(){
    'use strict'

    angular.module('client.crud')
        .controller('flashCardListController', FlashCardListController)

    FlashCardListController.$inject = ['$log', '$state', 'flashCards', 'flashCardService']

    function FlashCardListController($log, $state, flashCards, flashCardService) {
        
        //public variables
        let vm = this
        vm.flashCards = null

        init()

        function init(){
            vm.flashCards = flashCards
        }

    }
    
})();