'use strict';

/**
 * Controller for Titi
 **/
titiModule.controller('TitiCtrl', ['Titi',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Titi, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of titis
    $scope.titis = [];
	// titi to edit
    $scope.titi = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh titis list
     */
    $scope.refreshTitiList = function() {
    	try {
			$scope.titis = [];
        	Titi.getAll().then(
				function(success) {
        	        $scope.titis = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh titi
     */
    $scope.refreshTiti = function(no_primary_key_for_entity_Titi) {
    	try {
        	$scope.titi = null;
	        Titi.get(no_primary_key_for_entity_Titi).then(
				function(success) {
        	        $scope.titi = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the titis list page
     */
    $scope.goToTitiList = function() {
        $scope.refreshTitiList();
        $location.path('/titi');
    }
    /**
     * Go to the titi edit page
     */
    $scope.goToTiti = function(no_primary_key_for_entity_Titi) {
        $scope.refreshTiti(no_primary_key_for_entity_Titi);
        $location.path('/titi/'+no_primary_key_for_entity_Titi);
    }

    // Actions

    /**
     * Save titi
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Titi.create;
			} else {
				save = Titi.update;
			}
			save($scope.titi).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.titi = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete titi
     */
    $scope.delete = function(no_primary_key_for_entity_Titi) {
	    try {
			MessageHandler.cleanMessage();
    	    Titi.delete(no_primary_key_for_entity_Titi).then(
				function(success) {
                	$scope.goToTitiList();
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
        $scope.titi = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( no_primary_key_for_entity_Titi ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTiti(no_primary_key_for_entity_Titi);
    } else {
        // List page
        $scope.refreshTitiList();
    }
    
    
}]);
