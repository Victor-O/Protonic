'use strict';

angular
  .module('protonic')
  .controller('QuickReferenceController', QuickReferenceController);

QuickReferenceController.$nject = ['$rootScope', 'quickReferenceService', '_', 'NgTableParams', '$filter'];

function QuickReferenceController($rootScope, quickReferenceService, _, NgTableParams, $scope, $filter) {
  const vm = this;
  vm.$quickReferenceService = quickReferenceService;
  vm.description = '';
  vm.details = {};
  vm.showDetails = showDetails;
  vm.showQuickReference = showQuickReference;
  vm.showChemistryDictionary = showChemistryDictionary;
  vm.showChemicalCompounds = showChemicalCompounds;
  vm.showWithLetter = showWithLetter;
  $rootScope.showNavbar = true;
  $rootScope.title = 'Quick Reference';
  vm.quickReference = true;
  vm.chemistryDictionary = false;
  vm.chemicalCompounds = false;
  vm.chemistryDictionaryList = {};
  vm.chemistryDictionaryLetterList = {};
  vm.shortDictionaryList = {};
  vm.compoundsList = {};

  vm.$quickReferenceService.loadReferences()
    .then(function (result) {
      vm.listOfReferences = result;
    });

  vm.$quickReferenceService.loadDictionaryList()
    .then(function (result) {
      vm.chemistryDictionaryList = result.dictionaryList;
      vm.chemistryDictionaryLetterList = result.lettersList;
    });

  vm.$quickReferenceService.loadCompoundsList()
    .then(function (result) {
      vm.compoundsList = result;

      vm.tableParams = new NgTableParams({
          page: 1,     // show first page
          count: 10,   // count per page
          filter: {},
          sorting: {
            name: 'asc',     // initial sorting
          },
        },
        {
          counts: [],
          total: vm.compoundsList.length, // length of data
          getData: function ($defer, params) {
            var filters = {};

            angular.forEach(params.filter(), function (value, key) {
              var splitedKey = key.match(/^([a-zA-Z]+)\.([a-zA-Z]+)$/);

              if (!splitedKey) {
                filters[key] = value;
                return;
              }

              splitedKey = splitedKey.splice(1);

              var father = splitedKey[0],
                son = splitedKey[1];
              filters[father] = {};
              filters[father][son] = value;
            });

            // use build-in angular filter
            //var filteredData = params.filter() ? $filter('filter')(data, filters) : data;
            // use build-in angular filter
            var filteredData = {};
            if (params.filter().date !== null && params.filter().date !== "")
            //alert(JSON.stringify(params.filter().date));
              filteredData = params.filter() ?
                $filter('filter')(vm.compoundsList, filters) :
                vm.compoundsList;
            var orderedData = params.sorting() ?
              $filter('orderBy')(filteredData, params.orderBy()) :
              filteredData;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          },
        });

    });

  function showQuickReference() {
    vm.quickReference = true;
    vm.chemistryDictionary = false;
    vm.chemicalCompounds = false;
  }

  function showChemistryDictionary() {
    vm.quickReference = false;
    vm.chemistryDictionary = true;
    vm.chemicalCompounds = false;
    vm.showWithLetter('A');
  }

  function showChemicalCompounds() {
    vm.quickReference = false;
    vm.chemistryDictionary = false;
    vm.chemicalCompounds = true;
  }

  function showDetails(description, details) {
    vm.description = description;
    vm.details = details;
  }

  function showWithLetter(letter) {
    vm.shortDictionaryList = _.filter(vm.chemistryDictionaryList, { letter: letter });
    vm.description = '';
  }
}
