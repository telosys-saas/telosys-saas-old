var IDEWorkingFiles = {

  init: function() {
    this.display();
  },

  display: function() {
    var state = Store.getState();

    var html =
      '<ul class="collection">';

    for(var fileId in state.editors) {
      html +=
        '<li class="collection-item">' +
          '<a href="#" onclick="IDEWorkingFiles.showFile(\'' + fileId + '\')">' +
            fileId +
          '</a>' +
        '</li>';
    }

    html +=
      '</ul>';
    $('#workingfiles').html(html);
  },

  showFile: function(fileId) {
    var state = Store.getState();
    state.fileId = fileId;
    IDEEditorCodemirror.showFile();
  }

};