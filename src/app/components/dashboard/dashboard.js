'use strict';

angular
  .module('protonic')
  .controller('DashboardController', DashboardController);

DashboardController.$nject = ['$rootScope', '$state'];

function DashboardController($rootScope, $state) {
  const vm = this;

  $rootScope.showNavbar = false;
  $rootScope.title = '';

  vm.title = 'Hello';

  vm.goToMolecularCalculator = function () {
    $state.go('molecularCalculator');
  };

  vm.goToQuickReference = function () {
    $state.go('quickReference');
  };

  vm.goToPeriodicTable = function () {
    $state.go('periodicTable');
  };

  vm.goToSolutionTools = function () {
    $state.go('solutionTools');
  };

  vm.goToLandingPage = function () {
    $state.go('landingPage');
  };
}
