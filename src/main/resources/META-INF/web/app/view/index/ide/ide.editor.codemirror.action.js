
var IDEEditorCodemirrorAction = {

  loadFile: function(callback) {
    var state = Store.getState();
    if(state.fileId) {
      FilesService.getFileForProject(
        state.auth.userId, state.projectId, state.fileId, callback);
    }
  },

  saveFile: function() {
    var state = Store.getState();
    if(state.fileId && state.editor) {
      var file = {
        id: state.fileId,
        content: state.editor.getValue()
      };
      FilesService.saveFileForProject(state.auth.userId, state.projectId, file,
        function (file) {
        console.log('file saved');
      });
    }
  }

};