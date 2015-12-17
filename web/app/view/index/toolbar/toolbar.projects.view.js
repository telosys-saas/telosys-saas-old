var ToolbarProjects = {
  init: function() {
    ProjectsService.loadProjects(function(projects) {
      var state = Store.getState();
      var options = '';
      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var selected = '';
        if(state.projectId === project.id) {
          selected = ' selected';
        }
        options += '<option' + selected + ' value="' + project.id + '">' + project.name + '</option>'
      }
      $('#projects').html(options);
    });
  },

  changeProject: function(projectId) {
    var state = Store.getState();
    state.projectId = projectId;
    IDE.init();
  }
};