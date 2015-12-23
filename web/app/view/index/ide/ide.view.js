
var IDE = {
  init: function() {
    this.display();
    IDETreeview.init();
    IDEEditor.init();
    IDEGenerate.init();
  },

  display: function() {
    $('#main').html(
      '<div id="jstree" class="split split-horizontal content">' +
      '</div>' +
      '<div id="b" class="split split-horizontal">' +
        '<div id="editor" class="split content">' +
          '<div id="editorTabs" class="editorTabs"></div>' +
          '<div id="editor1" class="editorTabContent">' +
            '<div id="editorToolbar" class="editorToolbar"></div>' +
            '<div id="editorCodemirror" class="editorCodemirror"></div>' +
          '</div>' +
        '</div>' +
        '<div id="generate" class="split content">' +
        '</div>' +
      '</div>');

    Split(['#jstree', '#b'], {
      gutterSize: 8,
      sizes: [25, 75],
      cursor: 'col-resize'
    });

    Split(['#editor', '#generate'], {
      direction: 'vertical',
      sizes: [100, 1],
      minSizes: [100, 1],
      gutterSize: 8,
      cursor: 'row-resize'
    });
  }

};
