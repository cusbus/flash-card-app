;(function () {
    'use strict';

    angular.module('client.crud')
        .controller('flashCardCrudController', FlashCardCrudController)

    FlashCardCrudController.$inject = ['$state', '$log']

    function FlashCardCrudController($state, $log) {
        let vm = this

        //public functions
        vm.addAnimationCreateView = _addAnimationCreateView
        vm.addAnimationPractice = _addAnimationPractice

        init()

        function init() {

        }

        //these need to be refactored!!!!
        function _addAnimationCreateView(state) {
            if ($state.current.name == 'site.flash-cards.practice') { return { 'flipOutX': true } }
            if ($state.current.name == 'site.flash-cards') { return { 'flipInX': true } }
            if ($state.current.name == `site.flash-cards.${state}` && $state.current.name != 'site.flash-cards') { return { 'flipOutX': true } }
            else { return { 'flipInX': true } }
        }

        function _addAnimationPractice() {
            if ($state.current.name == 'site.flash-cards' || 'site.flash-cards.practice') { return { 'flipInX': true } }
            else { return { 'flipOutX': true } }
        }

    }
})();