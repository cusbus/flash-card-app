;(function () {
    'use strict';

    angular.module('client.crud')
        .controller('flashCardController', FlashCardController)

    FlashCardController.$inject = ['$state', '$log']

    function FlashCardController($state, $log) {
        let vm = this

        //public functions
        vm.addAnimation = _addAnimation
        vm.showFilter = _showFilter

        init()

        function init() {

        }

        function _addAnimation(bool) {
            if ($state.current.name !== 'site.flash-cards' && bool == true) { return { 'flipOutX': true } }
        }

        function _showFilter(){
            if ($state.current.name == 'site.flash-cards.practice') { return true }
        }

    }
})();