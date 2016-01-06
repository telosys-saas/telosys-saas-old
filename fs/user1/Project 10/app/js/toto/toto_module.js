'use strict';

/* Module for Toto */

var totoModule = angular.module('toto.module', ['myApp']);

/**
 * Module for toto
 */
totoModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/toto',    {templateUrl: 'partials/toto/toto_list.html', controller: 'TotoCtrl'});
    $routeProvider.when('/toto/new', {templateUrl: 'partials/toto/toto_form.html', controller: 'TotoCtrl'});
    $routeProvider.when('/toto/no_primary_key_for_entity_Toto', {templateUrl: 'partials/toto/toto_form.html', controller: 'TotoCtrl'});
}]);
