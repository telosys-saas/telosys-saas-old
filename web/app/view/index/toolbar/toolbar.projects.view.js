var ToolbarProjects = {
  init: function() {
    ProjectsService.loadProjects(function(projects) {
      var state = Store.getState();
      var options = '';
      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var selected = '';
        if(state.projectName === project.name) {
          selected = ' selected';
        }
        options += '<option' + selected + '>' + project.name + '</option>'
      }
      $('#projects').html(options);
    });
  },

  changeProject: function(projectName) {
    var state = Store.getState();
    state.projectName = projectName;
    IDE.init();
  }
};