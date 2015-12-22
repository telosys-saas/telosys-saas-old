var ToolbarProjectsAction = {

  onChangeProject: function(projectId, callback) {
    var state = Store.getState();

    var hasChangedProject = false;
    if(state.projectId == null || confirm("Close the project "+state.projectId)) {
      state.projectId = projectId;
      hasChangedProject = true;
    }

    callback(hasChangedProject, state.projectId);
  },

  launchGeneration: function() {
    var state = Store.getState();

    ProjectsService.launchGeneration(state.auth.userId, state.projectId, function() {
      console.log("Generation complete");
    })
  }

};