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
  },

  login: function(login, password, callback) {
    document.location = host + "/api/callback?username="+login+"&password="+password+"&client_name=FormClient";
  },

  createAccount: function(user, callback) {
    $.ajax({
      method: "POST",
      url: host + "/api/v1/users",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(user)
    })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      })
      .done(function (msg) {
        console.log(msg);
      });
  },

  saveAccount: function(user, callback) {
    $.ajax({
      method: "PUT",
      url: host + "/api/v1/users/"+user.login,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(user)
    })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      })
      .done(function (msg) {
        console.log(msg);
      });
  },

  getAccount: function(userId, callback) {
    $.ajax({
      method: "GET",
      url: host + "/api/v1/users/"+userId,
      dataType: 'json'
    })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      })
      .done(function (msg) {
        console.log(msg);
      });
  }

};