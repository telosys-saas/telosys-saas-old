var Toolbar = {
  init: function() {
    this.display();
    ToolbarProjects.init();
    ToolbarProjectnew.init();
    ToolbarSettings.init();
    ToolbarBundles.init();
    ToolbarGeneration.init();
    ToolbarUser.init();
  },

  display: function() {
    var state = Store.getState();

    var html =
      '<!-- Dropdown Structure -->' +
      '<ul id="toolbarProjectsList" class="dropdown-content"></ul>' +
      '<div class="light-blue darken-3 nav-wrapper">' +
        '<a href="#!" class="brand-logo left logo-telosys-min" style="position: relative; margin-left: 20px; margin-top: 5px;" onclick="ToolbarProjects.changeProject(null)"></a>' +
        '<a href="#!" class="brand-logo left" style="position: relative; margin-right: 20px;" onclick="ToolbarProjects.changeProject(null)">Telosys</a>' +
        '<ul id="nav-mobile" class="hide-on-med-and-down left">';

    if(state.auth.userId != null) {
      html +=
        '<li><a class="dropdown-button" href="#" data-activates="toolbarProjectsList">Project<span id="toolbarProjectsName"></span><i class="material-icons right">arrow_drop_down</i></a></li>';
    }

    if(state.projectId) {
      html +=
        '<li><a href="#" onclick="ToolbarSettings.openModal()">Settings</a></li>' +
        '<li><a href="#" onclick="ToolbarBundles.openModal()">Bundles</a></li>' +
        '<li><a href="#" onclick="ToolbarGeneration.openModal()">Generation</a></li>' +
        '<li><a href="#" onclick="ToolbarDownload.download()">Download</a></li>';
    }

    html +=
        '</ul>' +
        '<div class="right" id="toolbarUser">' +
        '</div>' +
      '</div>';

    $('#appbar').html(html);
    $('#appbar .dropdown-button').dropdown();
  }

};
