'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('toto.module'));
  
  describe('TotoCtrl', function(){
    var TotoCtrl, Toto,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Toto service
    	Toto = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'toto1'});
    			return deferred.promise;
    		}
    	};
		
				TotoCtrl = $controller('TotoCtrl', {
    		'Toto': Toto,
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
    	expect($scope.toto).toBeNull();
    	expect($scope.totos).toBe('toto1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTotoList', function() {
    	// given
    	Toto.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'toto2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTotoList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.totos).toBe('toto2');
    });
    
    it('refreshToto', function() {
    	// given
    	Toto.get = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'toto'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshToto();
    	$scope.$apply();
    	
    	// then
    	expect($scope.toto).toBe('toto');
    });
    
	it('goToTotoList', function() {
    	// given
    	spyOn($scope, "refreshTotoList");
    	
    	// when
    	$scope.goToTotoList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTotoList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/toto');
    });
    
    it('goToToto', function() {
    	// given
    	spyOn($scope, "refreshToto");
    	
    	// when
    	$scope.goToToto();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshToto).toHaveBeenCalledWith();
    	expect($location.path).toHaveBeenCalledWith('/toto');
    });
    
    it('save : create', function() {
    	// given
    	$scope.toto = {, name:'toto'};
    	
    	$scope.mode = 'create';
    	Toto.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'totoSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.toto).toBe('totoSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.toto = {, name:'toto'};
    	
    	$scope.mode = 'update';
    	Toto.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'totoSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.toto).toBe('totoSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Toto.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTotoList");
    	
    	// when
    	$scope.delete();
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTotoList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : toto create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/toto/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.toto).toBeNull();
    	expect($scope.totos).toBe('toto1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});