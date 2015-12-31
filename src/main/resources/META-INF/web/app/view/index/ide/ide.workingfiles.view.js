var IDEWorkingFiles = {

  init: function() {
    this.display();
  },

  display: function() {
    var state = Store.getState();

    var html =
      '<ul class="collection">';

    for(var fileId in state.openFiles) {
      var openFile = state.openFiles[fileId];
      var filename = fileId.substring(fileId.lastIndexOf('/')+1);
      var filepath = fileId.substring(0,fileId.lastIndexOf('/'));
      html +=
        '<li class="collection-item truncate" id="workingfiles_'+this.formatFileId(fileId)+'">';

      if(openFile.isModified) {
        html +=
          '<i class="fa fa-circle"></i> ';
      }
      else {
        html +=
          '<a href="#" onclick="IDEWorkingFiles.closeFile(\'' + fileId + '\')">' +
          '<i class="fa fa-times fa-lg"></i> ' +
          '</a>';
      }

      html +=
          '&nbsp; ' +
          '<a href="#" onclick="IDEWorkingFiles.showFile(\'' + fileId + '\')">' +
            filename +
            ' <span style="font-size: smaller; color: gray;">' + filepath + '</span>' +
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
    if(event != null) {
      event.stopPropagation();
    }

    var state = Store.getState();
    for(var fileId in state.openFiles) {
      IDEEditorCodemirror.saveFile(fileId);
    }
  },

  closeAll: function(event) {
    if(event != null) {
      event.stopPropagation();
    }

    var state = Store.getState();
    for(var fileId in state.openFiles) {
      this.closeFile(fileId);
    }

  }

};