
var ProjectsService = {
  loadProjects: function (callback) {
    $.ajax({
      url: host + "/api/rest/projects",
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
  }
}

