
var IDE = {
  init: function() {
    this.display();
    IDEWorkingFiles.init();
    IDETreeview.init();
    IDEEditor.init();
    IDEGenerate.init();
  },

  display: function() {
    var state = Store.getState();
    $('#main').html(
      '<div id="left" class="split split-horizontal content">' +
        '<ul class="collapsible" data-collapsible="expandable" style="margin: 0; box-shadow: none; border: none;">' +
          '<li>' +
            '<div class="collapsible-header active">' +
              '<i class="material-icons">track_changes</i>' +
              'Working files' +
              '<a href="#" style="float:right" onclick="IDEWorkingFiles.closeAll(event)"><i class="fa fa-times"></i></a>' +
              '<a href="#" style="float:right" onclick="IDEWorkingFiles.saveAll(event)"><i class="fa fa-floppy-o"></i></a>' +
            '</div>' +
            '<div class="collapsible-body" id="workingfiles" style="border: none;">' +
            '</div>' +
          '</li>' +
          '<li>' +
            '<div class="collapsible-header active">' +
              '<i class="material-icons">library_books</i>' +
              'Project ' + state.projectId +
            '</div>' +
            '<div class="collapsible-body" id="jstree" style="border: none;">' +
            '</div>' +
          '</li>' +
        '</ul>' +
      '</div>' +
      '<div id="b" class="split split-horizontal content">' +
        '<div id="editor" class="split">' +
        //  '<div id="editorTabs" class="editorTabs"></div>' +
        //  '<div id="editor1" class="editorTabContent">' +
            '<div id="editorToolbar" class="editorToolbar"></div>' +
            '<div id="editorCodemirror" class="editorCodemirror"></div>' +
        //  '</div>' +
        //'</div>' +
        //'<div id="generate" class="split content">' +
        '</div>' +
      '</div>');

    $('#left .collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    Split(['#left', '#b'], {
      gutterSize: 8,
      sizes: [25, 75],
      cursor: 'col-resize'
    });

    /*
    Split(['#editor', '#generate'], {
      direction: 'vertical',
      sizes: [100, 1],
      minSizes: [100, 1],
      gutterSize: 8,
      cursor: 'row-resize'
    });
    */
  }

};
