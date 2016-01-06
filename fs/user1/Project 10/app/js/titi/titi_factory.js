'use strict';

/**
 * Factory for Titi
 */
titiModule.factory('Titi', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage titi
    var entityURL = restURL + '/titi';
	
	/**
     * Validate titi
     * @param titi titi
     * @throws validation exception
     */
	var validate = function (titi) {
		var errors = [];
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all titis as list items
         * @return all titis as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/titi');
    	},

        /**
         * Get all titis
         * @return all titis
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get titi
         * @return titi
         */
    	get: function(no_primary_key_for_entity_Titi) {
    	    var url = entityURL + '/' + no_primary_key_for_entity_Titi;
        	return $http.get(url);
    	},

        /**
         * Create a new titi
         * @param titi titi
         * @return titi saved
         */
		create: function(titi) {
			validate(titi)
			var url = entityURL;
			return $http.post(url, titi);
    	},

        /**
         * Update titi
         * @param titi titi
         * @return titi saved
         */
    	update: function(titi) {
			validate(titi)
			var url = entityURL + '/' + no_primary_key_for_entity_Titi;
			return $http.put(url, titi);
    	},

		/**
         * Delete titi
         */
    	delete: function(no_primary_key_for_entity_Titi) {
        	var url = entityURL + '/' + no_primary_key_for_entity_Titi;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

