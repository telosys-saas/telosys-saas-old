var ToolbarProjectnew = {

  init: function() {
    this.display();
  },

  display: function() {
    $('#projectnew').html(
      '<input type="text" id="projectnewname" />' +
      '<button type="button" onclick="ToolbarProjectnew.createProject()">Create</button>');
  },

  createProject: function() {
    var projectName = document.getElementById('projectnewname').value;
    var state = Store.getState();
    ProjectsService.createProject(state.auth.userId, projectName, function(isOk) {
      if(isOk) {
        state.projectId = projectName;
      }
    });
  }

};