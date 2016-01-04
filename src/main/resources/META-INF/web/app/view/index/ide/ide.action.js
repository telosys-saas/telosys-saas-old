var IDEAction = {

  closeFile: function(fileId) {
    var state = Store.getState();
    IDEWorkingFiles.closeFile(fileId);
    if(fileId == state.fileId) {
      var state = Store.getState();
      delete state.fileId;
      IDEEditorCodemirror.closeFile();
    }
    IDEEditor.init();
  }

};