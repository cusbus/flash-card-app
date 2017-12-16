;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardController', FlashCardController)

    FlashCardController.$inject= ['$state', '$log']

    function FlashCardController($state, $log) {
        let vm = this

        init()

        function init() {
            $log.log('flash-card crud loaded')
        }
    }
})();