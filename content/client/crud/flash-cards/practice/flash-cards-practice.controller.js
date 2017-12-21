;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardPracticeController', FlashCardPracticeController)

    FlashCardPracticeController.$inject = ['$log', '$state', 'flashCards']

    function FlashCardPracticeController($log, $state, flashCards) {
        
        let vm = this
        
        //vars for toggling current card
        vm.toggleQuestion = true
        vm.toggleAnswer = false

        //carousel vars 
        vm.currentIndex = null
        vm.currentFlashCard = null
        vm.currentFlashCardArray = [] // public var for filter func
        let masterFlashCardArray = []    // backup var for filter change

        //public functions
        vm.filterCardTopics = _filterCardTopics
        vm.toggleQA = _toggleQA
        vm.updateCarouselIndex = _updateCarouselIndex
        vm.refreshCarouselCard = _refreshCarouselCard

        init()

        function init(){
            //create master copy of array & declare public var of array
            masterFlashCardArray = angular.copy(flashCards)
            vm.currentFlashCardArray = flashCards   
            
            //carousel starting point along with an index
            vm.currentFlashCard = vm.currentFlashCardArray[0]
            vm.currentIndex = 0
        }

        function _filterCardTopics(topic){

            //filter array
            vm.currentFlashCardArray = masterFlashCardArray.filter(card => {
                return card.category == topic || card.subCategory == topic
            })

            //reset carousel vars
            vm.currentFlashCard = vm.currentFlashCardArray[0]
            vm.currentIndex = 0
            
            //invoke refresh
            _refreshCarouselCard('Q')
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
            vm.currentFlashCard = vm.currentFlashCardArray[vm.currentIndex]
            if (qOrA == 'Q') { return vm.currentFlashCard.question }
            if (qOrA == 'A') { return vm.currentFlashCard.answer }
        }


        function _toggleQA(){
            vm.toggleAnswer = !vm.toggleAnswer
            vm.toggleQuestion = !vm.toggleQuestion
        }

    }

})();