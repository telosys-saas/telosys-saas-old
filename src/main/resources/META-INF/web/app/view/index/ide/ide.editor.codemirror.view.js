
var IDEEditorCodemirror = {
  init: function() {

    var state = Store.getState();
    if(state.fileId) {
      if(state.editors[state.fileId] == null) {
        this.loadFile();
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
    document.getElementById('editorCodemirror_'+state.fileId).style.display = 'block';
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

      $('#editorCodemirror').append('<div id="editorCodemirror_'+file.id+'"></div>');
      var editor = CodeMirror(document.getElementById('editorCodemirror_'+file.id), editorOptions);
      var state = Store.getState();
      state.editors[file.id] = editor;

      IDEWorkingFiles.display();
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

  }

};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}