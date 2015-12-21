
var IDEEditorCodemirror = {
  init: function() {
    $('#editorCodemirror').html('');

    IDEEditorCodemirrorAction.loadFile(function (file) {
      $('#editorCodemirror').html('');
      var editor = CodeMirror(document.getElementById('editorCodemirror'), {
        value: file.content,
        mode: "java",
        lineNumbers: true
      });
      var state = Store.getState();
      state.editor = editor;
    });
  }
};
