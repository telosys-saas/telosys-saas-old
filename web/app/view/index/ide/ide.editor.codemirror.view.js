
var IDEEditorCodemirror = {
  init: function() {
    $('#editorCodemirror').html('');
  },
  loadFile: function() {
    var state = Store.getState();
    if(state.fileId) {
      FilesService.getFileForProject(state.auth.userId, state.projectId, state.fileId, function (file) {
        $('#editorCodemirror').html('');
        var editor = CodeMirror(document.getElementById('editorCodemirror'), {
          value: file.content,
          mode: "javascript"
        });
        state.editor = editor;
      });
    }
  },
  saveFile: function() {
    var state = Store.getState();
    if(state.fileId && state.editor) {
      var file = {
        id: state.fileId,
        content: state.editor.getValue()
      };
      FilesService.saveFileForProject(state.auth.userId, state.projectId, file, function (file) {
        console.log('file savd');
      });
    }
  }
};
