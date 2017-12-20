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
        
        //carousel vars 
        vm.currentIndex = null
        vm.currentFlashCard = null

        //public functions
        vm.toggleQA = _toggleQA
        vm.updateCarouselIndex = _updateCarouselIndex
        vm.refreshCarouselCard = _refreshCarouselCard

        init()

        function init(){
            vm.currentFlashCard = flashCards[0]
            vm.currentIndex = 0
        }

        function _toggleQA(){
            vm.toggleAnswer = !vm.toggleAnswer
            vm.toggleQuestion = !vm.toggleQuestion
        }

        function _updateCarouselIndex (direction) {
            //handling previous click
            if (direction == 'previous') {
                if (vm.currentIndex === 0) {
                    vm.currentIndex = flashCards.length - 1
                }
                else { 
                    vm.currentIndex = vm.currentIndex - 1
                }
            }
            //handling next click
            if (direction == 'next') {
                if (vm.currentIndex == flashCards.length -1) {
                    vm.currentIndex = 0
                }
                else { 
                    vm.currentIndex = vm.currentIndex + 1
                }
                
            }
        }

        function _refreshCarouselCard(qOrA){
            vm.currentFlashCard = flashCards[vm.currentIndex]
            if (qOrA == 'Q') { return vm.currentFlashCard.question }
            if (qOrA == 'A') { return vm.currentFlashCard.answer }
        }
    }

})();