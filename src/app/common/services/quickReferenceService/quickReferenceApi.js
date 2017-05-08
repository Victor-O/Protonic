'use strict';

angular
  .module('protonic')
  .factory('quickReferenceApi', quickReferenceApi);

quickReferenceApi.$inject = ['$http', '$log', '_'];

function quickReferenceApi($http, $log, _) {
  return {
    getQuickReference: getQuickReference,
    getChemistryDictionaryList: getChemistryDictionaryList,
    getChemistryCompoundsList: getChemistryCompoundsList,
  }

  function getChemistryDictionaryList() {
    return $http.get('http://localhost:5000/api/chemistryDictionary')
      .then(getChemistryDictionaryComplete)
      .catch(getChemistryDictionaryFailed);

    function getChemistryDictionaryComplete(response) {
      return response;
    }

    function getChemistryDictionaryFailed(error) {
      $log.error('Failed to get chemistryDictionary.json.' + error.data);
    }
  }

  function getChemistryCompoundsList() {
    return $http.get('http://localhost:5000/api/chemicalCompounds')
      .then(getChemistryCompoundsComplete)
      .catch(getChemistryCompoundsFailed);

    function getChemistryCompoundsComplete(response) {
      return response;
    }

    function getChemistryCompoundsFailed(error) {
      $log.error('Failed to get chemistryCompounds.json.' + error.data);
    }
  }

  function getQuickReference() {
    return $http.get('http://localhost:5000/api/quickReference')
      .then(getQuickReferenceComplete)
      .catch(getQuickReferenceFailed);

    function getQuickReferenceComplete(response) {
      return response;
    }

    function getQuickReferenceFailed(error) {
      $log.error('Failed to get quickReferences.json.' + error.data);
    }
  }
}
