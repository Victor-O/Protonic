'use strict';

angular
  .module('protonic')
  .controller('SolutionToolsController', SolutionToolsController);

SolutionToolsController.$inject = ['$rootScope'];

function SolutionToolsController($rootScope) {
  const vm = this;
  $rootScope.showNavbar = true;
  $rootScope.title = 'Solution Tools';

  vm.extendedDilution = false;
  vm.c = false;
  vm.extendedMolarity = false;
  vm.extendedVolume = false;

  vm.extendDilution = function() {
    vm.extendedDilution = !vm.extendedDilution;
  };
  vm.extendPreparation = function() {
    vm.extendedPreparation = !vm.extendedPreparation;
  };
  vm.extendMolarity = function() {
    vm.extendedMolarity = !vm.extendedMolarity;
  };
  vm.extendVolume = function() {
    vm.extendedVolume = !vm.extendedVolume;
  };

  vm.C1 = '';
  vm.V1 = '';
  vm.C2 = '';
  vm.V2 = '';
  vm.dillutionMessage = '';

  vm.volume = '';
  vm.concentration = '';
  vm.mass = '';
  vm.moleculeWeight = '';
  vm.preparationMessage = '';

  vm.molecularMass = '';
  vm.sampleWeight = '';
  vm.molarityVolume = '';
  vm.molarity = '';
  vm.molarityMessage = '';

  vm.soluteVolume = '';
  vm.solutionVolume = '';
  vm.volumePercent = '';
  vm.volumePercentMessage = '';

  vm.resetDilution = function () {
    vm.C1 = '';
    vm.V1 = '';
    vm.C2 = '';
    vm.V2 = '';
  };
  vm.resetPreparation = function () {
    vm.volume = '';
    vm.concentration = '';
    vm.mass = '';
    vm.moleculeWeight = '';
  };
  vm.resetMolarity = function () {
    vm.molecularMass = '';
    vm.sampleWeight = '';
    vm.molarityVolume = '';
    vm.molarity = '';
  };
  vm.resetVolumePercent = function () {
    vm.soluteVolume = '';
    vm.solutionVolume = '';
    vm.volumePercent = '';
  };

  vm.findC1 = function () {
    if (vm.V1 !== '' && vm.C2 !== '' && vm.V2 !== '') {
      vm.dillutionMessage = '';
      vm.C1 = (vm.C2 * vm.V2) / vm.V1;
    } else {
      vm.dillutionMessage = 'Please fill others';
    }
  };
  vm.findV1 = function () {
    if (vm.C1 !== '' && vm.C2 !== '' && vm.V2 !== '') {
      vm.dillutionMessage = '';
      vm.V1 = (vm.C2 * vm.V2) / vm.C1;
    } else {
      vm.dillutionMessage = 'Please fill others';
    }
  };
  vm.findC2 = function () {
    if (vm.C1 !== '' && vm.V1 !== '' && vm.V2 !== '') {
      vm.dillutionMessage = '';
      vm.C2 = (vm.C1 * vm.V1) / vm.V2;
    } else {
      vm.dillutionMessage = 'Please fill others';
    }
  };
  vm.findV2 = function () {
    if (vm.C1 !== '' && vm.V1 !== '' && vm.C2 !== '') {
      vm.dillutionMessage = '';
      vm.V2 = (vm.C1 * vm.V1) / vm.C2;
    } else {
      vm.dillutionMessage = 'Please fill others';
    }
  };

  vm.findVolume = function () {
    if (vm.concentration !== '' && vm.mass !== '' && vm.moleculeWeight !== '') {
      vm.dillutionMessage = '';
      vm.volume = vm.mass / (vm.moleculeWeight * vm.concentration);
    } else {
      vm.preparationMessage = 'Please fill others';
    }
  };
  vm.findConcentration = function () {
    if (vm.volume !== '' && vm.mass !== '' && vm.moleculeWeight !== '') {
      vm.dillutionMessage = '';
      vm.concentration = vm.mass / (vm.moleculeWeight * vm.volume);
    } else {
      vm.preparationMessage = 'Please fill others';
    }
  };
  vm.findMass = function () {
    if (vm.volume !== '' && vm.concentration !== '' && vm.moleculeWeight !== '') {
      vm.dillutionMessage = '';
      vm.mass = vm.volume * vm.concentration * vm.moleculeWeight;
    } else {
      vm.preparationMessage = 'Please fill others';
    }
  };
  vm.findMoleculeWeight = function () {
    if (vm.volume !== '' && vm.concentration !== '' && vm.mass !== '') {
      vm.dillutionMessage = '';
      vm.moleculeWeight = vm.mass / (vm.volume * vm.concentration);
    } else {
      vm.preparationMessage = 'Please fill others';
    }
  };

  vm.findSampleWeight = function () {
    if (vm.molecularMass !== '' && vm.molarityVolume !== '' && vm.molarity !== '') {
      vm.molarityMessage = '';
      vm.sampleWeight = vm.molecularMass * vm.molarityVolume * vm.molarity;
    } else {
      vm.molarityMessage = 'Please fill others';
    }
  };
  vm.findMolarityVolume = function () {
    if (vm.molecularMass !== '' && vm.sampleWeight !== '' && vm.molarity !== '') {
      vm.molarityMessage = '';
      vm.molarityVolume = vm.sampleWeight / (vm.molecularMass * vm.molarity);
    } else {
      vm.molarityMessage = 'Please fill others';
    }
  };
  vm.findMolarity = function () {
    if (vm.molecularMass !== '' && vm.sampleWeight !== '' && vm.molarityVolume !== '') {
      vm.molarityMessage = '';
      vm.molarity = vm.sampleWeight / (vm.molecularMass * vm.molarityVolume);
    } else {
      vm.molarityMessage = 'Please fill others';
    }
  };

  vm.findVolumePercent = function () {
    if (vm.soluteVolume !== '' && vm.solutionVolume !== '') {
      vm.volumePercentMessage = '';
      vm.volumePercent = vm.soluteVolume / vm.solutionVolume * 100;
    } else {
      vm.volumePercentMessage = 'Please fill others';
    }
  };
}
