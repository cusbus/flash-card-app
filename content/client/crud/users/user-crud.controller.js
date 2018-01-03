;(function () {
    'use strict';

    angular.module('client.crud')
        .controller('userCrudController', UserCrudController)

    UserCrudController.$inject = ['$state', '$log']

    function UserCrudController($state, $log) {
        let vm = this

        //public functions
        vm.addAnimation = _addAnimation
        
        init()

        function init() {

        }

        function _addAnimation(state) {
            if ($state.current.name == 'site.flash-cards.manage-users') { return { 'flipInX': true } }
            if ($state.current.name == `site.flash-cards.manage-users.${state}`) { return { 'flipOutX': true } }
        }

    }
})();