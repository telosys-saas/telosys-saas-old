
var IDEEditorToolbar = {
  init: function () {
    var state = Store.getState();
    if(state.fileId) {
      var toolbar =
        '<button class="waves-effect waves-green btn" onclick="IDEEditorToolbar.saveFile()">' +
          '<span class="fa fa-floppy-o fa-lg"></span> Save' +
        '</button>' +
        '&nbsp; File : <span>' + state.fileId + '</span>';
      $('#editorToolbar').html(toolbar);
    }
  },

  saveFile: function() {
    IDEEditorCodemirrorAction.saveFile();
  }

};