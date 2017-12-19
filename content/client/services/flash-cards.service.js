;(function(){
    angular.module('client.services')
        .factory('flashCardService', FlashCardServiceFactory)

        FlashCardServiceFactory.$inject = ['$http', '$q']

        function FlashCardServiceFactory($http, $q) {
            return {
                readAll: _readAll,
                readById: _readById,
                create: _create,
                update: _update,
                delete: _delete
            }

            function _readAll() {
                return $http.get('/api/flash-cards')
                    .then(xhrSuccess)
                    .catch(onError)
            }

            function _readById(id) {
                return $http.get(`/api/flash-cards/${id}`)
                    .then(xhrSuccess)
                    .catch(onError)
            }

            function _create(flashCard){
                return $http.post('/api/flash-cards', flashCard)
            }

            function _update(flashCard){
                return $http.put(`/api/flash-cards/${flashCard._id}`, flashCard)
            }

            function _delete(id){
                return $http.delete(`/api/flash-cards/${id}`)
                    .then(xhrSuccess)
                    .catch(onError)
            }

            //response handlers
            function xhrSuccess(response) {
                return response.data
            }

            function onError(error) {
                console.log(error.data)
                return $q.reject(error.data)
            }
        }

})()