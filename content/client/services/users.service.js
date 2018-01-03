;(function(){
    angular.module('client.services')
        .factory('userService', UserServiceFactory)

    UserServiceFactory.$inject = ['$http', '$q']

    function UserServiceFactory($http, $q) {
        return {

        }

        
    }

})();
