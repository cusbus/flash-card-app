;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardDetailController', FlashCardDetailController)

    FlashCardDetailController.$inject = ['$state', '$stateParams', '$log', 'flashCard', 'flashCardService']

    function FlashCardDetailController($state, $stateParams, $log, flashCard, flashCardService) {
        //public variables
        let vm = this
        vm.flashCard = {}

        //public functions
        vm.delete = _delete

        init()

        function init(){
            vm.flashCard = flashCard
        }

        function _delete(id) {
            flashCardService.delete(id)
                .then(result => {
                    $log.log(result)
                    $state.go('site.flash-cards.list', null, { reload: true} )
                })
        }
    }

})();