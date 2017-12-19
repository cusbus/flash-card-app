;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('flashCardWriteController', FlashCardWriteController)

    FlashCardWriteController.$inject = ['$log', '$state', '$stateParams', 'flashCardService', 'flashCard']

    function FlashCardWriteController($log, $state, $stateParams, flashCardService, flashCard) {
        let vm = this
        
        // public variables
        vm.formData = {};
        vm.tagline = null

        // public functions
        vm.submit = _submit
        vm.goToMainView = _goToMainView

        init()

        function init(){
            $log.log('write controller landed')
            _checkAndSetMode()
        }

        function _checkAndSetMode(){
            if ($state.current.name === 'site.flash-cards.edit'){
                vm.tagline = "Edit"
                vm.formData = {
                    _id: flashCard._id,
                    question: flashCard.question,
                    answer: flashCard.answer,
                    category: flashCard.category,
                    subCategory: flashCard.subCategory
                }
            } else { vm.tagline = 'Create' }
        }

        function _submit(){
            if (vm.formData._id) {
                flashCardService.update(vm.formData)
                    .then(result => {
                        $log.log(result)
                        $state.go('site.flash-cards')
                    })
                    .catch(err => $log.log(err))
            }
            else {
                flashCardService.create(vm.formData) 
                    .then(result => {
                        $log.log(result)
                        $state.go('site.flash-cards')
                    })
                    .catch(err => $log.log(err))
            }
        }

        function _goToMainView() {
            $state.go('site.flash-cards')
        }
    }

})();