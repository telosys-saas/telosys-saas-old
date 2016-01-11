var IDEConsoleGeneration = {

  init: function() {
    this.display();
  },

  display: function() {
    var state = Store.getState();

    var html =
      '<div class="row">' +
        '<div class="col s12">' +
          '<div style="width: 100%">' +
            '<h5 class="inline-block">Generation : <span class="red-text">Errors</span></h5>' +
            '<button class="right btn waves-effect waves-green" onclick="IDEGeneration.launchGeneration()">' +
              '<span class="fa fa-play-circle fa-lg"></span>' +
              ' Generate again' +
            '</button>' +
          '</div>' +
          '<br/>' +
          '<table>' +
            '<tr>' +
              '<th>Error</th>' +
            '</tr>';

    var hasError = false;
    if(state.generationResults) {
      for (var i=0; i<state.generationResults.length; i++) {
        var generationResult = state.generationResults[i];
        if(generationResult.errors && generationResult.errors.length > 0) {
          for (var j=0; j<generationResult.errors.length; j++) {
            var error = generationResult.errors[j];
            hasError = true;
            html +=
              '<tr>' +
                '<td>' + error.message + '</td>' +
              '</tr>'
          }
        }
      }
    }

    html +=
            '</table>' +
          '</div>' +
        '</div>';

    if(!hasError) {
      if(state.generationResults) {
        html =
          '<div class="row">' +
            '<div class="col s12">' +
              '<div style="width: 100%">' +
                '<h5 class="inline-block">Generation : <span class="green-text">OK</span></h5>' +
                '<button class="right btn waves-effect waves-green" onclick="IDEGeneration.launchGeneration()">' +
                  '<span class="fa fa-play-circle fa-lg"></span>' +
                  ' Generate again' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>';
      } else {
        html =
          '<div class="row">' +
            '<div class="col s12">' +
              '<div style="width: 100%">' +
                '<h5 class="inline-block">No generation</h5>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
    }

    $('#consoleGeneration').html(html);

    if(hasError || state.generationResults) {
      $('#console ul.tabs').tabs('select_tab', 'consoleGeneration');
    }
  }

};