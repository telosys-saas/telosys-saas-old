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
        '<li class="collection-item" id="workingfiles_'+this.formatFileId(fileId)+'">' +
          '<a href="#" onclick="IDEWorkingFiles.closeFile(\'' + fileId + '\')">' +
            '<i class="fa fa-times fa-lg"></i> ' +
          '</a>' +
          '<a href="#" onclick="IDEWorkingFiles.showFile(\'' + fileId + '\')">' +
            fileId +
          '</a>' +
        '</li>';
    }

    html +=
      '</ul>';
    $('#workingfiles').html(html);
  },

  closeFile: function(fileId) {
    var state = Store.getState();
    $('#workingfiles_'+this.formatFileId(fileId)).remove();
    IDEEditorCodemirror.closeFile(fileId);
  },

  showFile: function(fileId) {
    var state = Store.getState();
    state.fileId = fileId;
    IDEEditor.init();
  },

  formatFileId: function(fileId) {
    return fileId.replace(/\./g,'_').replace(/\//g,'__');
  },

  saveAll: function(event) {
    event.stopPropagation();

    var state = Store.getState();
    for(var fileId in state.editors) {
      IDEEditorCodemirror.saveFile(fileId);
    }
  },

  closeAll: function(event) {
    event.stopPropagation();

    var state = Store.getState();
    for(var fileId in state.editors) {
      this.closeFile(fileId);
    }

  }

};