;(function () {
    'use strict';

    angular.module('client.crud')
        .controller('flashCardCrudController', FlashCardCrudController)

    FlashCardCrudController.$inject = ['$state', '$log']

    function FlashCardCrudController($state, $log) {
        let vm = this

        //public functions
        vm.addAnimation = _addAnimation
        
        init()

        function init() {

        }

        function _addAnimation(state) {
            if ($state.current.name == 'site.flash-cards.manage-cards') { return { 'flipInX': true } }
            if ($state.current.name == `site.flash-cards.manage-cards.${state}`) { return { 'flipOutX': true } }
        }

    }
})();