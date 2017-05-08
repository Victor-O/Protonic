'use strict';

angular
  .module('protonic')
  .factory('periodicTableApi', periodicTableApi);

periodicTableApi.$inject = ['$http', '$log'];

function periodicTableApi($http, $log) {
  return {
    getElements: getElements,
  }

  function getElements() {
    return $http.get('http://localhost:5000/api/elements')
      .then(getElementsComplete)
      .catch(getElementsFailed);

    function getElementsComplete(response) {
      return response;
    }

    function getElementsFailed(error) {
      $log.error('Failed to get elements.json.' + error.data);
    }
  }

}