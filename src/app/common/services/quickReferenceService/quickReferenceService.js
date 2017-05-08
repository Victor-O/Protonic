'use strict';

angular
  .module('protonic')
  .factory('quickReferenceService', quickReferenceService);

quickReferenceService.$inject = ['quickReferenceApi'];

function quickReferenceService(quickReferenceApi) {
  return {
    loadDictionaryList: loadDictionaryList,
    loadCompoundsList: loadCompoundsList,
    loadReferences: loadReferences,
  }

  function loadDictionaryList() {
    return quickReferenceApi.getChemistryDictionaryList()
      .then(function (response) {
        var chemistryDictionaryList = response.data;
        var letterList = _.uniqBy(chemistryDictionaryList, 'letter');
        var bothLists = { lettersList: letterList, dictionaryList: chemistryDictionaryList };

        return bothLists;
      });
  }

  function loadCompoundsList() {
    return quickReferenceApi.getChemistryCompoundsList()
      .then(function (response) {
        return response.data;
      });
  }

  function loadReferences() {
    return quickReferenceApi.getQuickReference()
      .then(function (response) {
        return response.data;
      });
  }
}
