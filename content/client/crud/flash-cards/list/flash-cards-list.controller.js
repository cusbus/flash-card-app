;(function(){
    'use strict'

    angular.module('client.crud')
        .controller('flashCardListController', FlashCardListController)

    FlashCardListController.$inject = ['$log', '$state']

    function FlashCardListController($log, $state) {
        let vm=this

        init()

        function init(){
            $log.log('list view controller loaded')
        }
    }
    
})();