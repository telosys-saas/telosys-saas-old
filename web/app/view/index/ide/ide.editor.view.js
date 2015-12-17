
var IDEEditor = {
  init: function() {
    $('#e').html('');
  },
  loadFile: function() {
    var state = Store.getState();
    if(state.fileId) {
      FilesService.getFileForProject(state.projectId, state.fileId, function (file) {
        $('#e').html('');
        CodeMirror(document.getElementById('e'), {
          value: file.content,
          mode: "javascript"
        });
      });
    }
  }
};
