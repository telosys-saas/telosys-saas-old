'use strict';

/* Module for Titi */

var titiModule = angular.module('titi.module', ['myApp']);

/**
 * Module for titi
 */
titiModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/titi',    {templateUrl: 'partials/titi/titi_list.html', controller: 'TitiCtrl'});
    $routeProvider.when('/titi/new', {templateUrl: 'partials/titi/titi_form.html', controller: 'TitiCtrl'});
    $routeProvider.when('/titi/no_primary_key_for_entity_Titi', {templateUrl: 'partials/titi/titi_form.html', controller: 'TitiCtrl'});
}]);
