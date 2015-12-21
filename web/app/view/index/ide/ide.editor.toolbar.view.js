
var IDEEditorToolbar = {
  init: function () {
    var state = Store.getState();
    var toolbar =
      '<button onclick="IDEEditorToolbar.saveFile()">' +
      '<span class="fa fa-floppy-o fa-lg"></span> Save' +
      '</button>' +
      '&nbsp;File : <span>'+state.fileId+'</span>';
    $('#editorToolbar').html(toolbar);
  },

  saveFile: function() {
    IDEEditorCodemirror.saveFile();
  }

};