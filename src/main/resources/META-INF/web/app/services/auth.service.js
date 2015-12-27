var AuthService = {

  status: function(callback) {
    var deferred = Q.defer();
    $.ajax({
      url: host + "/api/auth/user",
      dataType: 'json'
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        deferred.resolve(msg);
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        deferred.reject(textStatus);
      });
    return deferred.promise;
  }

};