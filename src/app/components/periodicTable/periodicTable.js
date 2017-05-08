'use strict';

angular
  .module('protonic')
  .controller('PeriodicTableController', PeriodicTableController);

PeriodicTableController.$inject = ['$rootScope', 'periodicTableService', '$log'];

function PeriodicTableController($rootScope, periodicTableService, $log) {
  const vm = this;
  vm.$periodicTableService = periodicTableService;
  $rootScope.showNavbar = true;
  $rootScope.title = 'Periodic Table';
  vm.elements = {};
  vm.displayProperty = 'type';
  vm.showElectroConfig = false;
  vm.typeLegend = true;
  vm.phaseLegend = false;
  vm.electronegativityLegend = false;
  vm.selectedElem = false;

  init();

  function init() {
    return vm.$periodicTableService.loadElements()
      .then(function (result) {
        vm.elements = result;
        return vm.elements;
      });
  }

  vm.selectForDetails = function (element) {
    vm.selectedElem = element;
  };

  vm.changeDisplayProperty = function (newProperty) {
    vm.displayProperty = newProperty;

    if (newProperty === 'type') {
      vm.typeLegend = true;
      vm.phaseLegend = false;
      vm.electronegativityLegend = false;
    } else if (newProperty === 'phase') {
      vm.typeLegend = false;
      vm.phaseLegend = true;
      vm.electronegativityLegend = false;
    } else if (newProperty === 'electronegativity') {
      vm.typeLegend = false;
      vm.phaseLegend = false;
      vm.electronegativityLegend = true;
    } else if (newProperty === 'electroconfig') {
      vm.typeLegend = false;
      vm.phaseLegend = false;
      vm.electronegativityLegend = false;
      vm.showElectroConfig = true;
    } else {
      vm.showElectroConfig = false;
    }
  };

  vm.elementClass = function (element) {
    if (vm.displayProperty === 'type') {
      return vm.$periodicTableService.setClassByType(element);
    } else if (vm.displayProperty === 'phase') {
      return vm.$periodicTableService.setClassByPhase(element);
    } else if (vm.displayProperty === 'electronegativity') {
      return vm.$periodicTableService.setClassByElectronegativity(element);
    } else if (vm.displayProperty === 'electroconfig') {
      return vm.$periodicTableService.setClassByElectroconfig(element);
    }
  };
}
