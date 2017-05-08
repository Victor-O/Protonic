angular.module('protonic', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ngTable'])
  .constant('_', window._)
  .config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/dashboard');

    // States
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
      })
      .state('molecularCalculator', {
        url: '/molecularCalculator',
        templateUrl: 'components/molecularCalculator/molecularCalculator.html',
        controller: 'MolecularCalculatorController',
        controllerAs: 'vm',
      })
      .state('quickReference', {
        url: '/quickReference',
        templateUrl: 'components/quickReference/quickReference.html',
        controller: 'QuickReferenceController',
        controllerAs: 'vm',
      })
      .state('periodicTable', {
        url: '/periodicTable',
        templateUrl: 'components/periodicTable/periodicTable.html',
        controller: 'PeriodicTableController',
        controllerAs: 'vm',
      })
      .state('solutionTools', {
        url: '/solutionTools',
        templateUrl: 'components/solutionTools/solutionTools.html',
        controller: 'SolutionToolsController',
        controllerAs: 'vm',
      })
      .state('landingPage', {
        url: '/landingPage',
        templateUrl: 'components/landingPage/landingPage.html',
        controller: 'LandingPageController',
        controllerAs: 'vm',
      });

  });
