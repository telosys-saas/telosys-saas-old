var IDEConsoleGeneration = {

  init: function() {
    this.display();
  },

  display: function() {
    var state = Store.getState();

    var html =
      '<div style="width: 100%">' +
        '<span class="generation-error-title">Generation errors</span>' +
        '<button class="right btn waves-effect waves-green" onclick="IDEGeneration.launchGeneration()">' +
          '<span class="fa fa-play-circle fa-lg"></span>' +
          ' Generate again' +
        '</button>' +
      '</div>' +
      '<table>';

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
      '</table>';

    if(!hasError) {
      if(state.generationResults) {
        html =
          '<div style="width: 100%">' +
            '<span class="generation-success-title">Generation successfull</span>' +
            '<button class="right btn waves-effect waves-green" onclick="IDEGeneration.launchGeneration()">' +
              '<span class="fa fa-play-circle fa-lg"></span>' +
              ' Generate again' +
            '</button>' +
          '</div>';
      } else {
        html = '';
      }
    }

    $('#consoleGeneration').html(html);
  },

}