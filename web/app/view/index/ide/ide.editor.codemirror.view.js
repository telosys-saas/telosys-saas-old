
var IDEEditorCodemirror = {
  init: function() {
    $('#editorCodemirror').html('');

    IDEEditorCodemirrorAction.loadFile(function (file) {
      $('#editorCodemirror').html('');

      var editorOptions = {
        value: file.content,
        lineNumbers: true
      };

      var mode = this.getModeForFileExtension(file.name);
      if(mode) {
        editorOptions.mode = mode;
      }

      var editor = CodeMirror(document.getElementById('editorCodemirror'), editorOptions);
      var state = Store.getState();
      state.editor = editor;
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
      default:
        return ext;
    }

  }

};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}