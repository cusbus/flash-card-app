;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardDetailController', FlashCardDetailController)

    FlashCardDetailController.$inject = ['$state', '$stateParams', '$log', 'flashCard']

    function FlashCardDetailController($state, $stateParams, $log, flashCard) {
        //public variables
        let vm = this
        vm.flashCard = {}

        init()

        function init(){
            vm.flashCard = flashCard
        }
    }

})();