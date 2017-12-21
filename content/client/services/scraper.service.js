;(function(){
    angular.module('client.services')
        .factory('scraperService', ScraperService)

    ScraperService.$inject = ['$http', '$q']

    function ScraperService($http, $q) {
        return {
            readAll: _readAll
        } 

        function _readAll(){
            return $http.get('/api/scraper')
                .then(xhrSuccess)
                .catch(onError)
        }

        //response handlers
        function xhrSuccess(response){
            return response.data
        }

        function onError(error){
            console.log(error.data)
            return $q.reject(error.data) 
        }

    }

})();