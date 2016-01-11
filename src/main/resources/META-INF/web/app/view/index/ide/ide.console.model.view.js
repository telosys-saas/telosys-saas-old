var IDEConsoleModel = {

  init: function() {
    this.refresh();
  },

  display: function() {
    var state = Store.getState();

    var hasError = false;

    var html =
      '<div style="width: 100%">' +
        '<h5>Models : <span class="red-text">Errors</span></h5>' +
      '</div>' +
      '<table>' +
        '<tr>' +
          '<th>Model</th>' +
          '<th>Entity</th>' +
          '<th>Error</th>' +
        '</tr>';

    var hasError = false;
    if(state.models) {
      for (var i=0; i<state.models.length; i++) {
        var model = state.models[i];
        for (var j=0; j<model.parsingErrors.length; j++) {
          var parsingError = model.parsingErrors[j];
          hasError = true;
          html +=
            '<tr>' +
              '<td>' + model.name + '</td>' +
              '<td>' + parsingError.entityName + '</td>' +
              '<td>' + parsingError.message + '</td>' +
            '</tr>';
        }
      }
    }

    html +=
      '</table>';

    if(!hasError) {
      html =
        '<div class="row">' +
        '<div class="col s12">' +
        '<h5>Models : <span class="green-text">OK</span></h5>' +
        '</div>' +
        '</div>';
    }

    $('#consoleModel').html(html);

    if(hasError) {
      $('#console ul.tabs').tabs('select_tab', 'consoleModel');
    }
  },

  refresh: function() {
    var state = Store.getState();
    ProjectsService.getModels(state.auth.userId, state.projectId, function (models) {
      state.models = models;
      console.log(models);

      this.display();
    }.bind(this));
  }

};