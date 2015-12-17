
var IDEEditorToolbar = {
  init: function () {
    var toolbar =
      '<button onclick="IDEEditorCodemirror.saveFile()">Save</button>';
    $('#editorToolbar').html(toolbar);
  }
}