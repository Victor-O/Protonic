'use strict';

angular
  .module('protonic')
  .controller('NavBarController', NavBarController);

NavBarController.$inject = ['$rootScope'];

function NavBarController($rootScope) {
  const vm = this;

  $rootScope.showNavbar = false;
  $rootScope.title = '';

}
