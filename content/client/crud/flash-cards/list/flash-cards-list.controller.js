;(function(){
    'use strict'

    angular.module('client.crud')
        .controller('flashCardListController', FlashCardListController)

    FlashCardListController.$inject = ['$log', '$state', 'flashCards', 'flashCardService']

    function FlashCardListController($log, $state, flashCards, flashCardService) {
        
        //public variables
        let vm = this
        vm.flashCards = null

        //public functions
        vm.delete = _delete

        init()

        function init(){
            vm.flashCards = flashCards
        }

        function _delete(id, index){
            flashCardService.delete(id)
                .then(result => {
                    $log.log(result)
                    vm.flashCards.splice(index, 1)
                })
                .catch(error => $log.log(error))
        }
    }
    
})();