var ToolbarProjects = {
  init: function() {
    var state = Store.getState();
    ProjectsService.loadProjects(state.auth.userId, function(projects) {
      var options = '';
      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var selected = '';
        if(state.projectId === project.id) {
          selected = ' selected';
        }
        options += '<option' + selected + ' value="' + project.id + '">' + project.name + '</option>'
      }
      $('#toolbarProjects').html(options);
    });
  },

  changeProject: function(projectId) {
    var state = Store.getState();
    state.projectId = projectId;
    IDE.init();
  }
};