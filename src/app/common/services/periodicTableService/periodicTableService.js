'use strict';

angular
  .module('protonic')
  .factory('periodicTableService', periodicTableService);

periodicTableService.$inject = ['periodicTableApi', '_'];

function periodicTableService(periodicTableApi, _) {
  return {
    loadElements: loadElements,
    setClassByType: setClassByType,
    setClassByPhase: setClassByPhase,
    setClassByElectronegativity: setClassByElectronegativity,
    setClassByElectroconfig: setClassByElectroconfig,
  };

  function loadElements() {
    return periodicTableApi.getElements()
      .then(function (response) {
        var elementsArray = [];
        var tempArray = [];

        for (var i = 0; i < 9; i++) {
          tempArray[i] = [];
          elementsArray[i] = [];
        }
        response.data.forEach(function (element) {
          for (var j = 1; j <= 9; j++) {
            if (element['Display Row'] === j) {
              tempArray[j - 1].push(element);
            }
          }
        });

        for (var m = 0; m < tempArray.length; m++) {
          var columnArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
          var fakeColumnArray = [];
          tempArray[m].forEach(function (element) {
            _.pull(columnArray, element['Display Column']);
          });


          columnArray.forEach(function (columnNumber) {
            var newElem = {};
            newElem['Display Column'] = columnNumber
            newElem.Symbol = '\u00A0';
            newElem['Atomic Weight'] = '\u00A0';
            newElem['Atomic Number'] = '\u00A0';
            newElem.Type = '\u00A0';
            newElem['Electron Configuration'] = '\u00A0';
            fakeColumnArray.push(newElem);
          });

          elementsArray[m] = _.union(tempArray[m], fakeColumnArray);
          elementsArray[m] = _.sortBy(elementsArray[m], 'Display Column');
        }
        var emptyRow = [];
        for (var x = 0; x < 18; x++) {
          var newElem = {};
          newElem['Display Column'] = '\u00A0';
          newElem.Symbol = '\u00A0';
          newElem['Atomic Weight'] = '\u00A0';
          newElem['Atomic Number'] = '\u00A0';
          newElem.Type = '\u00A0';
          newElem['Electron Configuration'] = '\u00A0';
          emptyRow.push(newElem);
        }

        elementsArray.splice(7, 0, emptyRow);

        return elementsArray;
      });
  }

  function setClassByType(element) {
    if (element.Type === 'Nonmetal') {
      return 'nonmetal';
    } else if (element.Type === 'Noble Gas') {
      return 'nobleGas';
    } else if (element.Type === 'Alkali Metal') {
      return 'alkaliMetal';
    } else if (element.Type === 'Alkaline Earth Metal') {
      return 'alkalineEarthMetal';
    } else if (element.Type === 'Metalloid') {
      return 'metalloid';
    } else if (element.Type === 'Halogen') {
      return 'halogen';
    } else if (element.Type === 'Transition Metal') {
      return 'transitionMetal';
    } else if (element.Type === 'Transactinide') {
      return 'transactinide';
    } else if (element.Type === 'Lanthanide') {
      return 'lanthanide';
    } else if (element.Type === 'Actinide') {
      return 'actinide';
    } else if (element.Type === 'Metal') {
      return 'metal';
    }
  }

  function setClassByPhase(element) {
    if (element.Phase === 'solid') {
      return 'solid';
    } else if (element.Phase === 'gas') {
      return 'gas';
    } else if (element.Phase === 'artificial') {
      return 'artificial';
    } else if (element.Phase === 'liq') {
      return 'liquid';
    }
  }

  function setClassByElectronegativity(element) {
    if (element.Electronegativity >= 0 && element.Electronegativity < 1) {
      return 'electronegativity01';
    } else if (element.Electronegativity >= 1 && element.Electronegativity < 2) {
      return 'electronegativity12';
    } else if (element.Electronegativity >= 2 && element.Electronegativity < 3) {
      return 'electronegativity23';
    } else if (element.Electronegativity >= 3 && element.Electronegativity <= 4) {
      return 'electronegativity34';
    }
  }

  function setClassByElectroconfig(element) {
    if (element['Electron Configuration'] !== '\u00A0') {
      return 'electroconfig';
    }
  }
}
