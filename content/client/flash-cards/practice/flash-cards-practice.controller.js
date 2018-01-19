;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardPracticeController', FlashCardPracticeController)

    FlashCardPracticeController.$inject = ['$log', '$state', 'flashCardService', 'flashCards']

    function FlashCardPracticeController($log, $state, flashCardService, flashCards) {
        
        let vm = this
        
        //vars for toggling current card
        vm.toggleToQuestion = true  
        vm.toggleToAnswer = false

        //carousel vars 
        vm.currentIndex = null
        vm.currentFlashCard = null
        let currentFlashCardArray = [] // public var for filter func

        //public functions
        vm.filterCardTopics = _filterCardTopics
        vm.toggleQA = _toggleQA
        vm.navigateCarouselIndex = _navigateCarouselIndex
        vm.refreshCarouselCard = _refreshCarouselCard
        vm.updateBucket = _updateBucket

        init()

        function init(){
            currentFlashCardArray = flashCards   
            
            //carousel starting point along with an index
            vm.currentFlashCard = currentFlashCardArray[0]
            vm.currentIndex = 0
        }

        function _filterCardTopics(topic){

            //for launch and catch all
            if (!topic) {
                return currentFlashCardArray = flashCards
            }

            //filter array
            currentFlashCardArray = flashCards.filter(card => {
                return card.category == topic || card.subCategory == topic
            })

            //reset carousel vars
            vm.currentFlashCard = currentFlashCardArray[0]
            vm.currentIndex = 0

            //invoke refresh
            _refreshCarouselCard('Q')
        }
        
        function _navigateCarouselIndex(direction) {
            //ensures questions always displayed when navigating
            if (vm.toggleToAnswer) { _toggleQA() }

            //handling previous click
            if (direction == 'previous') {
                if (vm.currentIndex === 0) {
                    vm.currentIndex = currentFlashCardArray.length - 1
                }
                else { 
                    vm.currentIndex = vm.currentIndex - 1
                }
            }
            //handling next click
            if (direction == 'next') {
                if (vm.currentIndex == currentFlashCardArray.length -1) {
                    vm.currentIndex = 0
                }
                else { 
                    vm.currentIndex = vm.currentIndex + 1
                }
            }
        }

        function _refreshCarouselCard(qOrA){
            vm.currentFlashCard = currentFlashCardArray[vm.currentIndex]
            if (qOrA == 'Q') { return vm.currentFlashCard.question }
            if (qOrA == 'A') { return vm.currentFlashCard.answer }
        }

        function _toggleQA(){
            vm.toggleToAnswer = !vm.toggleToAnswer
            vm.toggleToQuestion = !vm.toggleToQuestion
        }

        function _updateBucket(adjuster) {
            if (adjuster == "increment") {
                //line below can be deleted as soon as all legacy data has bucket prop
                if (!vm.currentFlashCard.bucket) { vm.currentFlashCard.bucket = 1 } 
                
                vm.currentFlashCard.bucket += 1
                flashCardService.update(vm.currentFlashCard)
                    .then(result => {
                        $log.log(result)
                        _navigateCarouselIndex('next')
                    })
                    .catch(err => $log.log(err))
             }

            if (adjuster == "decrement") {
                vm.currentFlashCard.bucket = 1
                flashCardService.update(vm.currentFlashCard)
                    .then(result => {
                        $log.log(result)
                        _navigateCarouselIndex('next')
                    })
                    .catch(err => $log.log(err))
             }
        }


    }

})();