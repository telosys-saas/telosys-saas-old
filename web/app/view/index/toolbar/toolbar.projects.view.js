var ToolbarProjects = {
  init: function() {
    var state = Store.getState();
    ProjectsService.loadProjects(state.auth.userId, function(projects) {
      var html = '';
      for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var selected = '';
        if(state.projectId === project.id) {
          selected = ' selected';
        }
        //html += '<option' + selected + ' value="' + project.id + '">' + project.name + '</option>'
        html += '<li><a href="#!" onclick="ToolbarProjects.changeProject(\''+project.id+'\')">'+project.name+'</a></li>';
      }
      html += '<li class="divider"></li>';
      html += '<li><a href="#!" onclick="ToolbarProjectnew.openModal()">New project</a></li>';
      $('#toolbarProjectsList').html(html);
    });
  },

  changeProject: function(projectId) {
    ToolbarProjectsAction.onChangeProject(projectId,
      function(hasChangedProject, newProjectId) {
        if(newProjectId != null) {
          $('#toolbarProjectsName').html(' : '+newProjectId);
        } else {
          $('#toolbarProjectsName').html('');
        }
        Main.display();
      });
  }

};