'use strict';

/**
 * Controller for Toto
 **/
totoModule.controller('TotoCtrl', ['Toto',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Toto, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of totos
    $scope.totos = [];
	// toto to edit
    $scope.toto = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh totos list
     */
    $scope.refreshTotoList = function() {
    	try {
			$scope.totos = [];
        	Toto.getAll().then(
				function(success) {
        	        $scope.totos = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh toto
     */
    $scope.refreshToto = function(no_primary_key_for_entity_Toto) {
    	try {
        	$scope.toto = null;
	        Toto.get(no_primary_key_for_entity_Toto).then(
				function(success) {
        	        $scope.toto = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the totos list page
     */
    $scope.goToTotoList = function() {
        $scope.refreshTotoList();
        $location.path('/toto');
    }
    /**
     * Go to the toto edit page
     */
    $scope.goToToto = function(no_primary_key_for_entity_Toto) {
        $scope.refreshToto(no_primary_key_for_entity_Toto);
        $location.path('/toto/'+no_primary_key_for_entity_Toto);
    }

    // Actions

    /**
     * Save toto
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Toto.create;
			} else {
				save = Toto.update;
			}
			save($scope.toto).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.toto = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete toto
     */
    $scope.delete = function(no_primary_key_for_entity_Toto) {
	    try {
			MessageHandler.cleanMessage();
    	    Toto.delete(no_primary_key_for_entity_Toto).then(
				function(success) {
                	$scope.goToTotoList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.toto = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( no_primary_key_for_entity_Toto ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshToto(no_primary_key_for_entity_Toto);
    } else {
        // List page
        $scope.refreshTotoList();
    }
    
    
}]);
