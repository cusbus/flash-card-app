;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardWriteController', FlashCardWriteController)

    FlashCardWriteController.$inject = ['$log', '$state', '$stateParams', 'flashCardService']

    function FlashCardWriteController($log, $state, $stateParams, flashCardService) {
        let vm = this
        
        // public variables
        vm.formData = {};

        // public functions
        vm.submit = _submit

        init()

        function init(){
            $log.log('write controller landed')
        }

        function _submit(){
            flashCardService.create(vm.formData) 
                .then(result => {
                    $log.log(result)
                    $state.go('site.flash-cards')
                })
                .catch(err => $log.log(err))
        }

    }

})();