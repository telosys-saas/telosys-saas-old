'use strict';

/**
 * Factory for Toto
 */
totoModule.factory('Toto', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage toto
    var entityURL = restURL + '/toto';
	
	/**
     * Validate toto
     * @param toto toto
     * @throws validation exception
     */
	var validate = function (toto) {
		var errors = [];
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all totos as list items
         * @return all totos as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/toto');
    	},

        /**
         * Get all totos
         * @return all totos
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get toto
         * @return toto
         */
    	get: function(no_primary_key_for_entity_Toto) {
    	    var url = entityURL + '/' + no_primary_key_for_entity_Toto;
        	return $http.get(url);
    	},

        /**
         * Create a new toto
         * @param toto toto
         * @return toto saved
         */
		create: function(toto) {
			validate(toto)
			var url = entityURL;
			return $http.post(url, toto);
    	},

        /**
         * Update toto
         * @param toto toto
         * @return toto saved
         */
    	update: function(toto) {
			validate(toto)
			var url = entityURL + '/' + no_primary_key_for_entity_Toto;
			return $http.put(url, toto);
    	},

		/**
         * Delete toto
         */
    	delete: function(no_primary_key_for_entity_Toto) {
        	var url = entityURL + '/' + no_primary_key_for_entity_Toto;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

