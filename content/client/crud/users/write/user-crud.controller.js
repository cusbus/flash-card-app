;(function(){
    'use strict';

    angular.module('client.crud')
        .controller('userWriteController', UserWriteController)

    UserWriteController.$inject = ['$log', '$state', '$stateParams', 'userService']

    function UserWriteController($log, $state, $stateParams, userService) {
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
            // if (user) { vm.editMode = true }
        }

        function _checkAndSetMode(){
            //edit mode
            if ($state.current.name === 'site.flash-cards.manage-users.edit'){
                vm.tagline = "Edit"
                vm.formData = {
                    _id: user._id,
                    username: flashCard.question,
                    sessions: {

                    }
                }
            //create mode
            } else { vm.tagline = 'Create' }
        }

        function _submit(){
            if (user) {
                userService.update(vm.formData)
                    .then(result => {
                        $log.log(result)
                        $state.go('site.flash-cards.manage-users.list')
                    })
                    .catch(err => $log.log(err))
            }
            else {
                vm.formData.bucket = 1;
                flashCardService.create(vm.formData) 
                    .then(result => {
                        $log.log(result)
                        $state.go('site.flash-cards.manage-users')
                    })
                    .catch(err => $log.log(err))
            }
        }

        function _goToMainView() {
            $state.go('site.flash-cards.manage-users')
        }
    }

})();