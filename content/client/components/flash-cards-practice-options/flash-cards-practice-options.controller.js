;(function(){
    angular.module('client.flash-cards').component('cardOptions', {
        templateUrl: 'client/components/flash-cards-practice-options/flash-card-options.html',
        controller: 'flashCardOptionComponentController as ctrl',
        bindings: {
            headlines: '='
        }
    })

    angular.module('client.flash-cards')
        .controller('flashCardOptionComponentController', FlashCardOptionComponentController)

        FlashCardOptionComponentController.$inject = ['$log']

    function FlashCardOptionComponentController($log) {
        let vm = this

        //public functions
        vm.$onInit = $onInit
        
        function $onInit(){
            
        }

    }

})();