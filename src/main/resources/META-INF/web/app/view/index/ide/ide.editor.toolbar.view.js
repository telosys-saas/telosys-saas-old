
var IDEEditorToolbar = {
  init: function () {
    var state = Store.getState();
    if(state.fileId) {
      var html =
        '<button class="waves-effect waves-green btn" onclick="IDEEditorToolbar.saveFile()">' +
          '<span class="fa fa-floppy-o fa-lg"></span> Save' +
        '</button>' +
        '&nbsp; File : <span>' + state.fileId + '</span>';
    } else {
      var html = '&nbsp;';
    }
    $('#editorToolbar').html(html);
  },

  saveFile: function() {
    IDEEditorCodemirror.saveFile();
  }

};