'use strict';

angular
  .module('protonic')
  .controller('MolecularCalculatorController', MolecularCalculatorController);

MolecularCalculatorController.$nject = ['$rootScope', 'molecularCalculatorService'];

function MolecularCalculatorController($rootScope, molecularCalculatorService) {
  const vm = this;
  vm.molecularCalculatorService = molecularCalculatorService;

  $rootScope.showNavbar = true;
  $rootScope.title = 'Molecular Calculator';

  vm.title = 'Hello';
  vm.inputValue = '';
  vm.listOfElements = [];
  vm.theMolecularMass = 0;
  vm.showError = false;

  vm.molecularCalculatorService.loadElementsList()
    .then(function (result) {
      vm.listOfElements = result;
    });

  vm.calculateMolecularMass = function () {
    const cleanInput = vm.inputValue.replace(/[\W_]+/g, '');
    const elementsList = cleanInput.match(/[A-Z][a-z]?\d*|\([^()]*(?:\(.*\))?[^()]*\)\d+/g);
    if (elementsList === null) {
      vm.showError = true;
      return;
    }

    vm.showError = false;
    vm.theMolecularMass = vm.handleItemsInList(elementsList, 1).toFixed(2);
  };

  vm.handleItemsInList = function (aListOfItems, aMultiplier) {
    var theResult = 0;

    aListOfItems.forEach(function (item) {
      if (item.charAt(0) === '(') {
        const theNumber = item.substring(item.lastIndexOf(')') + 1);
        const newItem = item.substring(0, item.lastIndexOf(')') + 1);
        const newList = newItem.match(/[A-Z][a-z]?\d*|\([^()]*(?:\(.*\))?[^()]*\)\d+/g);
        theResult = theResult + vm.handleItemsInList(newList, theNumber);
      } else {
        const theTempResult = aMultiplier ? aMultiplier * vm.calculateSingleElementMass(item) : vm.calculateSingleElementMass(item);
        theResult = theResult + theTempResult;
      }
    });

    return theResult;
  };

  vm.calculateSingleElementMass = function (element) {
    const theElementSymbol = element.match(/[a-zA-Z]+/g);
    const theMultiplier = element.replace(/\D/g, '');
    var theMass = 0;

    const theElement = vm.listOfElements.filter(function(elem) {
      return elem.Symbol == theElementSymbol;
    });

    if (theElement) {
      theMass = theMultiplier ? theMultiplier * theElement[0]['Atomic Weight'] : theElement[0]['Atomic Weight'];
    } else {
      vm.showError = true;
    }

    return theMass;
  };
}
