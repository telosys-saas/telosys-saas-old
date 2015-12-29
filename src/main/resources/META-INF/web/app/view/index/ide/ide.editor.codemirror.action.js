
var IDEEditorCodemirrorAction = {

  saveFile: function() {
    var state = Store.getState();
    if(state.fileId && state.editors[state.fileId]) {
      var file = {
        id: state.fileId,
        content: state.editors[state.fileId].getValue()
      };
      FilesService.saveFileForProject(state.auth.userId, state.projectId, file,
        function (file) {
        console.log('file saved');
      });
    }
  }

};