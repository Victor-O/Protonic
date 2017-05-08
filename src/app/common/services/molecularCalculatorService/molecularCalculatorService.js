'use strict';

angular
  .module('protonic')
  .factory('molecularCalculatorService', molecularCalculatorService);

molecularCalculatorService.$inject = ['periodicTableApi'];

function molecularCalculatorService(periodicTableApi) {
  return {
    loadElementsList: loadElementsList,
  };

  function loadElementsList() {
    return periodicTableApi.getElements()
      .then(function (response) {
        return response.data;
      });
  }
}
