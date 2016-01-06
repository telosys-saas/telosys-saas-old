'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('titi.module'));
  
  describe('TitiCtrl', function(){
    var TitiCtrl, Titi,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// Titi service
    	Titi = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'titi1'});
    			return deferred.promise;
    		}
    	};
		
				TitiCtrl = $controller('TitiCtrl', {
    		'Titi': Titi,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.titi).toBeNull();
    	expect($scope.titis).toBe('titi1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTitiList', function() {
    	// given
    	Titi.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'titi2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTitiList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.titis).toBe('titi2');
    });
    
    it('refreshTiti', function() {
    	// given
    	Titi.get = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'titi'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTiti();
    	$scope.$apply();
    	
    	// then
    	expect($scope.titi).toBe('titi');
    });
    
	it('goToTitiList', function() {
    	// given
    	spyOn($scope, "refreshTitiList");
    	
    	// when
    	$scope.goToTitiList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTitiList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/titi');
    });
    
    it('goToTiti', function() {
    	// given
    	spyOn($scope, "refreshTiti");
    	
    	// when
    	$scope.goToTiti();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTiti).toHaveBeenCalledWith();
    	expect($location.path).toHaveBeenCalledWith('/titi');
    });
    
    it('save : create', function() {
    	// given
    	$scope.titi = {, name:'titi'};
    	
    	$scope.mode = 'create';
    	Titi.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'titiSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.titi).toBe('titiSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.titi = {, name:'titi'};
    	
    	$scope.mode = 'update';
    	Titi.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'titiSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.titi).toBe('titiSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Titi.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTitiList");
    	
    	// when
    	$scope.delete();
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTitiList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : titi create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/titi/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.titi).toBeNull();
    	expect($scope.titis).toBe('titi1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});