var ToolbarBundles = {

  init: function() {
  },

  loadData: function(callback) {
    var state = Store.getState();

    // Bundles in public repository
    BundlesService.getBundlesInPublicRepository(function(bundlesInPublicRepository) {
      state.bundlesInPublicRepository = bundlesInPublicRepository;

      // Bundles in the project
      ProjectsService.getBundlesOfProject(state.auth.userId, state.projectId, function(bundlesOfProject) {
        state.bundlesOfProject = bundlesOfProject;
        if(callback) {
          callback();
        }

      }.bind(this));
    }.bind(this));
  },

  openModal: function() {
    this.loadData(function() {
      this.display();
      $('#bundlesModal').openModal();
    }.bind(this));
  },

  display: function() {
    var html =
      '<div id="bundlesModal" class="modal modal-fixed-footer"></div>';
    $('#bundles').html(html);
    this.displayModal();
  },

  displayModal: function() {
    var state = Store.getState();

    var html =
        '<div class="modal-content">' +
          '<div class="row">' +
            '<div class="col s12">' +
              '<h4>Bundles</h4>' +
              '<h6>Current bundles of the project</h6>' +
              '<ul class="collapsible" data-collapsible="accordion">';

    for (var i=0; i<state.bundlesOfProject.length; i++) {
      var bundle = state.bundlesOfProject[i];
      html +=
        '<li>' +
          '<div class="collapsible-header">' +
            '<i class="material-icons">redeem</i>' +
            bundle.name +
          '</div>' +
          '<div class="collapsible-body"><p>' +
            bundle.name +
            '<button class="btn red right" onclick="ToolbarBundles.removeBundle(\''+bundle.name+'\')" style="margin-top:-8px">Remove</button>' +
          '</p></div>' +
        '</li>';
    }

    html +=
              '</ul>' +
              '<h6>Bundles in the public repository</h6>' +
              '<ul class="collapsible" data-collapsible="accordion">';

    for (var i=0; i<state.bundlesInPublicRepository.length; i++) {
      var bundle = state.bundlesInPublicRepository[i];
      html +=
        '<li>' +
          '<div class="collapsible-header">' +
            '<i class="material-icons">redeem</i>' +
            bundle.name +
            '</div>' +
          '<div class="collapsible-body"><p>' +
            bundle.description +
            '<button class="btn green right" onclick="ToolbarBundles.addBundle(\''+bundle.name+'\')" style="margin-top:-8px">Add</button>' +
          '</p>' +
          '</div>' +
        '</li>';
    }

    html +=
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat "onclick="ToolbarBundles.cancel()">Cancel</a>' +
        '</div>';

    $('#bundlesModal').html(html);
    $('#bundlesModal .collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  },

  cancel: function() {
    $('#bundlesModal').closeModal();
  },

  addBundle: function(bundleName) {
    var state = Store.getState();
    ProjectsService.addBundle(state.auth.userId, state.projectId, bundleName, function() {
      console.log('Bundle added : ',bundleName);
      this.loadData(function() {
        this.displayModal();
      }.bind(this));
    }.bind(this));
  },

  removeBundle: function(bundleName) {
    var state = Store.getState();
    ProjectsService.removeBundle(state.auth.userId, state.projectId, bundleName, function() {
      console.log('Bundle removed : ',bundleName);
      this.loadData(function() {
        this.displayModal();
      }.bind(this));
    }.bind(this));
  }

};