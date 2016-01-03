
var IDEEditorCodemirror = {
  init: function() {

    var state = Store.getState();
    if(state.fileId) {
      if(state.openFiles[state.fileId].editor == null) {
        this.loadFile();
      } else if(state.openFiles[state.fileId].isRefreshed) {
        this.showFile();
        this.refreshFile(state.fileId);
      } else {
        this.showFile();
      }
    }
  },

  hideFiles: function() {
    $('#editorCodemirror').children().css( "display", "none");
  },

  showFile: function() {
    var state = Store.getState();
    this.hideFiles();
    document.getElementById('editorCodemirror_'+this.formatFileId(state.fileId)).style.display = 'block';
    state.openFiles[state.fileId].editor.refresh();
  },

  closeFile: function(fileId) {
    var state = Store.getState();
    delete state.openFiles[fileId];
    if(state.fileId == fileId) {
      delete state.fileId;
    }
    $('#editorCodemirror_'+this.formatFileId(fileId)).remove();
    IDEEditor.init();
  },

  loadFile: function() {
    var state = Store.getState();
    FilesService.getFileForProject(state.auth.userId, state.projectId, state.fileId, function (file) {

      var editorOptions = {
        value: file.content,
        lineNumbers: true
      };

      var mode = this.getModeForFileExtension(file.name);
      if (mode) {
        editorOptions.mode = mode;
      }

      this.hideFiles();

      $('#editorCodemirror').append('<div id="editorCodemirror_'+this.formatFileId(file.id)+'"></div>');
      var editor = CodeMirror(document.getElementById('editorCodemirror_'+this.formatFileId(file.id)), editorOptions);
      var state = Store.getState();
      state.openFiles[file.id].editor = editor;

      editor.on("change", this.callbackOnFileChange(file.id));

      IDEWorkingFiles.display();
    }.bind(this));
  },

  refreshFile: function(fileId, forceRefresh) {
    var state = Store.getState();
    if(state.openFiles[fileId] && (!state.openFiles[fileId].isModified || forceRefresh)) {
      state.openFiles[fileId].isRefreshed = true;
      if(state.fileId == fileId) {
        FilesService.getFileForProject(state.auth.userId, state.projectId, fileId, function (file) {

          var editor = state.openFiles[file.id].editor;

          state.openFiles[file.id].isModified = false;

          editor.setValue(file.content);

          IDEWorkingFiles.display();
          IDEEditorToolbar.display();
        }.bind(this));
      }
    }
  },

  callbackOnFileChange: function(fileId) {
    return (function(editor, change) {
      var state = Store.getState();
      if(state.openFiles[fileId].isRefreshed) {
          state.openFiles[fileId].isRefreshed = false;
      } else {
        this.setFileIsModified(fileId, true);
      }
    }.bind(this));
  },

  getModeForFileExtension: function(file) {

    if(file == null || file.indexOf('.') == -1) {
      return null;
    }

    var ext = file.substring(file.indexOf('.') + 1);
    if(ext == null) {
      return null;
    }

    switch(ext) {
      case 'js':
        return 'javascript';
      case 'java':
        return 'text/x-java';
      case 'css':
        return 'css';
      case 'php':
        return 'php';
      case 'vm':
        return 'text/velocity';
      case 'entity':
        return 'text/x-java';
      default:
        return ext;
    }
  },

  saveFile: function(fileId) {
    var state = Store.getState();

    if(fileId == null) {
      fileId = state.fileId;
    }

    if(fileId && state.openFiles[fileId]) {
      var file = {
        id: fileId,
        content: state.openFiles[fileId].editor.getValue()
      };
      FilesService.saveFileForProject(state.auth.userId, state.projectId, file,
        function () {
          console.log('file saved : ',fileId);
          this.setFileIsModified(fileId, false);
        }.bind(this));
    }
  },

  setFileIsModified: function(fileId, isModified) {
    var state = Store.getState();
    var openFile = state.openFiles[fileId];
    if(openFile.isModified != isModified) {
      openFile.isModified = isModified;
      if(isModified) {
        openFile.isWorkingFile = true;
      }
      IDEWorkingFiles.display();
      IDEEditorToolbar.display();
    }
  },

  setFileIsWorkingFile: function(fileId, isWorkingFile) {
    var state = Store.getState();
    var openFile = state.openFiles[fileId];
    if(openFile.isWorkingFile != isWorkingFile) {
      openFile.isWorkingFile = isWorkingFile;
      IDEWorkingFiles.display();
    }
  },

  formatFileId: function(fileId) {
    return fileId.replace(/\./g,'_').replace(/\//g,'__');
  }

};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}