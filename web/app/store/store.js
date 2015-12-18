var Store = {
  init: function() {
    var deferred = Q.defer();

    this.state = {
      projectId: 'project2',
      fileId: 'file1txt'
    };

    AuthService.status()
      .then(function(auth) {
        this.state.auth = auth;
        deferred.resolve(this.state);

      }.bind(this))
      .catch(function(e) {
        deferred.reject(e);

      });

    return deferred.promise;
  },
  getState: function() {
    return this.state;
  }
};
