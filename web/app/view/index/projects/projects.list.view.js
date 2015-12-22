
var ProjectsList = {

  init: function() {
    var state = Store.getState();
    ProjectsService.loadProjects(state.auth.userId, function(projects) {
      var options = '';
      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        options += '<div>'+project.id + ' - ' + project.name + '</div>'
      }
      $('#projects').html(options);
    });
  }

};
