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
        vm.editMode = false

        // public functions
        vm.submit = _submit
        vm.goToMainView = _goToMainView

        init()

        function init(){
            _checkAndSetMode()
            if (flashCard) { vm.editMode = true }
        }

        function _checkAndSetMode(){
            //edit mode
            if ($state.current.name === 'site.flash-cards.edit'){
                vm.tagline = "Edit"
                vm.formData = {
                    _id: flashCard._id,
                    question: flashCard.question,
                    answer: flashCard.answer,
                    category: flashCard.category,
                    subCategory: flashCard.subCategory,
                    bucket: flashCard.bucket
                }
            //create mode
            } else { vm.tagline = 'Create' }
        }

        function _submit(){
            if (flashCard) {
                flashCardService.update(vm.formData)
                    .then(result => {
                        $log.log(result)
                        $state.go('site.flash-cards.list')
                    })
                    .catch(err => $log.log(err))
            }
            else {
                vm.formData.bucket = 1;
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