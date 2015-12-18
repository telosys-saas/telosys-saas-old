
var IDEEditorToolbar = {
  init: function () {
    var toolbar =
      '<button onclick="IDEEditorCodemirror.saveFile()"><span class="fa fa-floppy-o fa-lg"></span> Save</button>';
    $('#editorToolbar').html(toolbar);
  }
}