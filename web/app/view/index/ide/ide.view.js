
var IDE = {
  init: function() {
    this.display();
    IDETreeview.init();
    IDEEditor.init();
  },

  display: function() {
    $('#main').html(
      '<div id="jstree" class="split split-horizontal content">' +
      '</div>' +
      '<div id="b" class="split split-horizontal">' +
        '<div id="editor" class="split content">' +
          '<div id="editorToolbar" class="editorToolbar"></div>' +
          '<div id="editorCodemirror"></div>' +
        '</div>' +
        '<div id="f" class="split content">' +
          '<button onclick="ToolbarProjectsAction.launchGeneration()">Settings</button>' +
        '</div>' +
      '</div>');

    Split(['#jstree', '#b'], {
      gutterSize: 8,
      sizes: [25, 75],
      cursor: 'col-resize'
    });

    Split(['#editor', '#f'], {
      direction: 'vertical',
      sizes: [75, 25],
      gutterSize: 8,
      cursor: 'row-resize'
    });
  }

};
