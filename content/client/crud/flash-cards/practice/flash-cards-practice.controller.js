;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardPracticeController', FlashCardPracticeController)

    FlashCardPracticeController.$inject = ['$log', '$state', 'flashCards']

    function FlashCardPracticeController($log, $state, flashCards) {
        //public variables
        let vm = this
        vm.toggleQuestion = true
        vm.toggleAnswer = false

        //public functions
        vm.toggleQA = _toggleQA

        init()

        function init(){
            vm.flashCards = flashCards
        }

        function _toggleQA(){
            vm.toggleAnswer = !vm.toggleAnswer
            vm.toggleQuestion = !vm.toggleQuestion
        }
    }

})();