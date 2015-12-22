
var ProjectsService = {
  loadProjects: function (userId, callback) {
    $.ajax({
      url: host + "/api/v1/users/"+userId+"/projects",
      dataType: 'json'
    })
    .done(function (msg) {
      console.log(msg);
    })
    .success(function (msg) {
      console.log(msg);
      if (callback) {
        callback(msg);
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.log(textStatus);
    });
  },

  createProject: function (userId, projectName, callback) {
    $.ajax({
      method: "PUT",
      url: host + "/api/v1/users/"+userId+"/projects/"+projectName,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        id: projectName,
        name: projectName
      })
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
